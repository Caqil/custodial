/**
 * Confirmation Progress Component
 * Visual progress bar showing transaction confirmations
 */

import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

interface ConfirmationProgressProps {
  confirmations: number
  required?: number
}

/**
 * Progress bar for blockchain transaction confirmations
 */
export function ConfirmationProgress({
  confirmations,
  required = 6
}: ConfirmationProgressProps) {
  const percentage = Math.min((confirmations / required) * 100, 100)
  const isComplete = confirmations >= required

  const getProgressColor = () => {
    if (isComplete) return 'bg-green-500'
    if (percentage >= 50) return 'bg-yellow-500'
    return 'bg-blue-500'
  }

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-medium'>
          Confirmations
        </span>
        <Badge variant={isComplete ? 'outline' : 'secondary'}
               className={isComplete ? 'border-green-500 bg-green-50 text-green-700' : ''}>
          {confirmations} / {required}
        </Badge>
      </div>
      <Progress
        value={percentage}
        className='h-2'
        indicatorClassName={getProgressColor()}
      />
    </div>
  )
}
