/**
 * React Query mutation hook for exporting transactions to CSV
 */

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { reportRepository } from '@/infrastructure/api/repositories'
import type { TransactionReportRequest } from '@/core/entities/transaction.entity'

/**
 * Hook to export transactions to CSV
 */
export function useExportCSV() {
  return useMutation({
    mutationFn: (request: TransactionReportRequest) =>
      reportRepository.exportTransactionsCSV(request),
    onSuccess: (blob) => {
      // Download CSV file
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      toast.success('CSV exported successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to export CSV: ${error.message}`)
    },
  })
}
