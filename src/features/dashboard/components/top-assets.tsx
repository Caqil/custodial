/**
 * Top Assets Component
 * Shows top cryptocurrency assets by value
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { useAssetsUnderCustody } from '@/features/analytics/hooks'
import { TrendingUp, TrendingDown } from 'lucide-react'

export function TopAssets() {
  const { data, isLoading } = useAssetsUnderCustody()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='h-16 w-full' />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data?.currencies) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Assets</CardTitle>
          <CardDescription>By total value</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>No asset data available</p>
        </CardContent>
      </Card>
    )
  }

  // Convert to array if needed
  const currenciesArray = Array.isArray(data.currencies)
    ? data.currencies
    : Object.values(data.currencies)

  if (currenciesArray.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Assets</CardTitle>
          <CardDescription>By total value</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>No asset data available</p>
        </CardContent>
      </Card>
    )
  }

  // Sort by total value and take top 5
  const topAssets = [...currenciesArray]
    .sort((a, b) => parseFloat(b.total_value_usd || '0') - parseFloat(a.total_value_usd || '0'))
    .slice(0, 5)

  const maxValue = parseFloat(topAssets[0]?.total_value_usd || '0')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Assets</CardTitle>
        <CardDescription>Highest value cryptocurrencies under custody</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {topAssets.map((asset, index) => {
            const value = parseFloat(asset.total_value_usd || '0')
            const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0
            const change = parseFloat(asset.change_24h || '0')

            return (
              <div key={asset.currency} className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-sm'>
                      {asset.currency.slice(0, 2)}
                    </div>
                    <div>
                      <p className='font-medium'>{asset.currency}</p>
                      <p className='text-xs text-muted-foreground'>
                        {parseFloat(asset.total_amount || '0').toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}{' '}
                        units
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-semibold'>
                      $
                      {value.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <div
                      className={`flex items-center justify-end text-xs ${
                        change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {change >= 0 ? (
                        <TrendingUp className='h-3 w-3 mr-1' />
                      ) : (
                        <TrendingDown className='h-3 w-3 mr-1' />
                      )}
                      {Math.abs(change).toFixed(2)}%
                    </div>
                  </div>
                </div>
                <Progress value={percentage} className='h-2' />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
