
import { Download } from 'lucide-react';
import { Button } from '../Button';

interface Purchase {
  id: string;
  courseTitle: string;
  date: string;
  price: string;
  status: string;
}

interface PurchasesTabProps {
  purchaseHistory: Purchase[];
  downloadInvoice: (invoiceId: string) => void;
}

export function PurchasesTab({ purchaseHistory, downloadInvoice }: PurchasesTabProps) {
  return (
    <div className="rounded-xl bg-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Invoice ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Course</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Price</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {purchaseHistory.map((purchase) => (
              <tr key={purchase.id} className="border-b border-gray-700 last:border-0">
                <td className="whitespace-nowrap px-6 py-4 text-sm">{purchase.id}</td>
                <td className="px-6 py-4 text-sm">{purchase.courseTitle}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">{purchase.date}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">{purchase.price}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    purchase.status === 'Completed' 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {purchase.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => downloadInvoice(purchase.id)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}