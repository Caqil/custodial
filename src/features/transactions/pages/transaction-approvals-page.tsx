/**
 * Transaction Approvals Page
 * Manage pending transaction approvals and approval workflow
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ApprovalQueue } from '../components/approval-queue'
import { TransactionApproveDialog } from '../components/transaction-approve-dialog'
import { TransactionRejectDialog } from '../components/transaction-reject-dialog'
import { TransactionFeesChart } from '../components/transaction-fees-chart'
import { Shield, Users, Clock, CheckCircle } from 'lucide-react'
import type { Transaction } from '@/core/entities/transaction.entity'

/**
 * Transaction Approvals Page Component
 */
export default function TransactionApprovalsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [dialogState, setDialogState] = useState({
    approve: false,
    reject: false,
  })

  const handleApprove = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setDialogState((prev) => ({ ...prev, approve: true }))
  }

  const handleReject = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setDialogState((prev) => ({ ...prev, reject: true }))
  }

  const closeDialog = (dialogName: keyof typeof dialogState) => {
    setDialogState((prev) => ({ ...prev, [dialogName]: false }))
  }

  return (
    <div className='container mx-auto space-y-8 py-8'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Transaction Approvals</h1>
        <p className='text-muted-foreground'>
          Review and approve pending transactions requiring authorization
        </p>
      </div>

      {/* Approval Workflow Info */}
      <div className='grid gap-4 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Multi-Signature</CardTitle>
            <Shield className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>2-of-3</div>
            <p className='text-xs text-muted-foreground'>
              Required approvals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Approvers</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>5</div>
            <p className='text-xs text-muted-foreground'>
              Authorized users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Avg Time</CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>15m</div>
            <p className='text-xs text-muted-foreground'>
              To approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Approval Rate</CardTitle>
            <CheckCircle className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>98.5%</div>
            <p className='text-xs text-muted-foreground'>
              Success rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className='grid gap-4 md:grid-cols-2'>
        {/* Approval Queue */}
        <ApprovalQueue
          onApprove={handleApprove}
          onReject={handleReject}
        />

        {/* Fee Analysis */}
        <TransactionFeesChart />
      </div>

      {/* Security Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Guidelines</CardTitle>
          <CardDescription>
            Best practices for reviewing and approving transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2 text-sm'>
            <li className='flex items-start gap-2'>
              <CheckCircle className='h-4 w-4 text-green-600 mt-0.5' />
              <span>Verify transaction amounts and destination addresses carefully</span>
            </li>
            <li className='flex items-start gap-2'>
              <CheckCircle className='h-4 w-4 text-green-600 mt-0.5' />
              <span>Check risk scores and flag high-risk transactions for additional review</span>
            </li>
            <li className='flex items-start gap-2'>
              <CheckCircle className='h-4 w-4 text-green-600 mt-0.5' />
              <span>Ensure MFA verification before approving large transactions</span>
            </li>
            <li className='flex items-start gap-2'>
              <CheckCircle className='h-4 w-4 text-green-600 mt-0.5' />
              <span>Document any unusual patterns or suspicious activity</span>
            </li>
            <li className='flex items-start gap-2'>
              <CheckCircle className='h-4 w-4 text-green-600 mt-0.5' />
              <span>Never approve transactions under pressure or time constraints</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <TransactionApproveDialog
        transaction={selectedTransaction}
        open={dialogState.approve}
        onOpenChange={(open) => closeDialog('approve')}
      />

      <TransactionRejectDialog
        transaction={selectedTransaction}
        open={dialogState.reject}
        onOpenChange={(open) => closeDialog('reject')}
      />
    </div>
  )
}
