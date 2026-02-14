import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TransactionHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions", user?.email],

    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/transactions?email=${user.email}`);

      return res.data;
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Transaction History</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Transaction ID</th>

              <th>Ticket Title</th>

              <th>Amount</th>

              <th>Payment Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx) => (
              <tr key={tx._id}>
                <td>{tx.transactionId}</td>

                <td>{tx.ticketTitle}</td>

                <td>Tk {tx.amount}</td>

                <td>{new Date(tx.paymentDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
