import { useEffect, useState, type FormEvent } from "react";
import {
  createAccount,
  getAllAccounts,
} from "../services/accountService";
import type {
  Account,
  AccountType,
  CreateAccountRequest,
} from "../types/account";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export function Dashboard() {
  const userEmail = useSelector(
    (state: RootState) => state.auth.userEmail
  );

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(
    null
  );

  const [form, setForm] = useState<{
    accountType: AccountType;
    initialBalance: string;
    interestRate: string;
    overdraftLimit: string;
    userId: string;
    credentialsId: string;
  }>({
    accountType: "SAVINGS",
    initialBalance: "1000",
    interestRate: "3",
    overdraftLimit: "500",
    userId: "1",
    credentialsId: "1",
  });

  // load all accounts in dashboard
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getAllAccounts();
        setAccounts(res.data);
      } catch (err: Error | unknown) {
        setError(err instanceof Error ? err.message : "Failed to load accounts");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleCreateAccount(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const payload: CreateAccountRequest = {
      accountType: form.accountType,
      initialBalance: Number(form.initialBalance),
      interestRate: Number(form.interestRate),
      overdraftLimit: Number(form.overdraftLimit),
      userId: Number(form.userId),
      credentialsId: Number(form.credentialsId),
    };

    try {
      setLoading(true);
      const res = await createAccount(payload);
      setSuccessMessage(res.message);
      // adiciona a conta criada à lista
      setAccounts((prev) => [...prev, res.data]);
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>DeerBank Dashboard</h1>
        <p>Welcome{userEmail ? `, ${userEmail}` : ""} 👋</p>
      </div>

      <div className="dashboard-layout">
        {/* Create Account */}
        <section className="card">
          <h2>Create Account</h2>
          <form className="dashboard-form" onSubmit={handleCreateAccount}>
            <label className="auth-label">
              Account Type
              <select
                name="accountType"
                value={form.accountType}
                onChange={handleChange}
                className="auth-input"
              >
                <option value="SAVINGS">SAVINGS</option>
                <option value="CHECKING">CHECKING</option>
              </select>
            </label>

            <label className="auth-label">
              Initial Balance
              <input
                type="number"
                name="initialBalance"
                className="auth-input"
                value={form.initialBalance}
                onChange={handleChange}
                required
                min={0}
              />
            </label>

            <label className="auth-label">
              Interest Rate (%)
              <input
                type="number"
                name="interestRate"
                className="auth-input"
                value={form.interestRate}
                onChange={handleChange}
                required
                min={0}
              />
            </label>

            <label className="auth-label">
              Overdraft Limit
              <input
                type="number"
                name="overdraftLimit"
                className="auth-input"
                value={form.overdraftLimit}
                onChange={handleChange}
                required
                min={0}
              />
            </label>

            <label className="auth-label">
              User ID
              <input
                type="number"
                name="userId"
                className="auth-input"
                value={form.userId}
                onChange={handleChange}
                required
                min={1}
              />
            </label>

            <label className="auth-label">
              Credentials ID
              <input
                type="number"
                name="credentialsId"
                className="auth-input"
                value={form.credentialsId}
                onChange={handleChange}
                required
                min={1}
              />
            </label>

            <button className="auth-button" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>

            {successMessage && (
              <p style={{ color: "#16a34a", fontSize: 12, marginTop: 8 }}>
                {successMessage}
              </p>
            )}
            {error && (
              <p style={{ color: "#dc2626", fontSize: 12, marginTop: 8 }}>
                {error}
              </p>
            )}
          </form>
        </section>

        {/* Accounts list */}
        <section className="card">
          <h2>Your Accounts</h2>
          {loading && accounts.length === 0 && <p>Loading accounts...</p>}
          {!loading && accounts.length === 0 && <p>No accounts found.</p>}

          {accounts.length > 0 && (
            <table className="accounts-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Type</th>
                  <th>Balance</th>
                  <th>Status</th>
                  <th>Opened</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((acc) => (
                  <tr key={acc.accountId}>
                    <td>{acc.accountNo}</td>
                    <td>{acc.accountType}</td>
                    <td>${acc.balance.toFixed(2)}</td>
                    <td>{acc.status}</td>
                    <td>{new Date(acc.openedDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}
