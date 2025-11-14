/**
 * Voting Timeline Component
 * Visual timeline showing proposal lifecycle
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import type { GovernanceProposal } from '@/core/entities/governance.entity'
import { cn } from '@/lib/utils'

interface VotingTimelineProps {
  proposal: GovernanceProposal
}

export function VotingTimeline({ proposal }: VotingTimelineProps) {
  const now = new Date()
  const createdAt = new Date(proposal.created_at)
  const votingStarts = new Date(proposal.voting_starts_at)
  const votingEnds = new Date(proposal.voting_ends_at)
  const executedAt = proposal.executed_at ? new Date(proposal.executed_at) : null

  const events = [
    {
      label: 'Created',
      date: createdAt,
      completed: true,
    },
    {
      label: 'Voting Starts',
      date: votingStarts,
      completed: now >= votingStarts,
    },
    {
      label: 'Voting Ends',
      date: votingEnds,
      completed: now >= votingEnds,
    },
    executedAt && {
      label: 'Executed',
      date: executedAt,
      completed: true,
    },
  ].filter(Boolean) as Array<{ label: string; date: Date; completed: boolean }>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Proposal Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {events.map((event, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border-2',
                    event.completed
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted bg-background text-muted-foreground'
                  )}
                >
                  {event.completed ? '✓' : index + 1}
                </div>
                {index < events.length - 1 && (
                  <div
                    className={cn(
                      'h-16 w-0.5',
                      event.completed ? 'bg-primary' : 'bg-muted'
                    )}
                  />
                )}
              </div>
              <div className="flex-1 pb-8">
                <div className="font-medium">{event.label}</div>
                <div className="text-sm text-muted-foreground">
                  {format(event.date, 'PPpp')}
                </div>
                {event.label === 'Voting Ends' && now < votingEnds && (
                  <div className="mt-1 text-sm font-medium text-primary">
                    {formatTimeRemaining(votingEnds, now)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function formatTimeRemaining(end: Date, now: Date): string {
  const diff = end.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) {
    return `${days}d ${hours}h remaining`
  } else if (hours > 0) {
    return `${hours}h ${minutes}m remaining`
  } else {
    return `${minutes}m remaining`
  }
}
