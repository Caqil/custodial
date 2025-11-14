# Entity Mapping Documentation

This document provides a comprehensive mapping between the backend Go structs and frontend TypeScript interfaces for the Custodial Wallet Admin Panel.

## Table of Contents

- [Overview](#overview)
- [Data Type Mappings](#data-type-mappings)
- [Entity Mappings](#entity-mappings)
  - [User Domain](#user-domain)
  - [Wallet Domain](#wallet-domain)
  - [Transaction Domain](#transaction-domain)
  - [Blockchain Domain](#blockchain-domain)
  - [Security Domain](#security-domain)
  - [Staking Domain](#staking-domain)
  - [Governance Domain](#governance-domain)
  - [Pool Domain](#pool-domain)
- [Special Considerations](#special-considerations)

## Overview

All backend models are mapped to TypeScript interfaces in the frontend admin panel to ensure type safety and data consistency. The mapping follows these principles:

1. **Field Names**: Backend JSON tags are used exactly as-is in TypeScript (snake_case)
2. **UUIDs**: Backend `uuid.UUID` maps to TypeScript `string`
3. **Timestamps**: Backend `time.Time` maps to TypeScript `string` (ISO 8601 format)
4. **Decimals**: Backend `decimal.Decimal` maps to TypeScript `string` (to preserve precision)
5. **Optional Fields**: Backend pointer types or `omitempty` tags map to TypeScript optional (`?`) fields
6. **Enums**: Backend const string types map to TypeScript string enums

## Data Type Mappings

| Backend Type (Go) | Frontend Type (TypeScript) | Notes |
|------------------|---------------------------|-------|
| `uuid.UUID` | `string` | UUID in string format |
| `time.Time` | `string` | ISO 8601 timestamp |
| `*time.Time` | `string \| undefined` | Optional timestamp |
| `decimal.Decimal` | `string` | Preserves precision |
| `string` | `string` | Direct mapping |
| `int`, `int64` | `number` | Direct mapping |
| `bool` | `boolean` | Direct mapping |
| `[]string` | `string[]` | Array of strings |
| `[]uuid.UUID` | `string[]` | Array of UUID strings |
| `map[string]interface{}` | `Record<string, unknown>` | JSON object |
| `gorm.DeletedAt` | Not exposed | Soft delete field |

## Entity Mappings

### User Domain

#### User
**Backend**: `internal/domain/user/user.go` - `User` struct
**Frontend**: `custodial-admin/src/core/entities/user.entity.ts` - `User` interface

| Backend Field | Backend Type | Frontend Field | Frontend Type | Notes |
|--------------|-------------|----------------|---------------|-------|
| `ID` | `uuid.UUID` | `id` | `string` | Primary key |
| `Email` | `string` | `email` | `string` | Unique |
| `OrganizationName` | `string` | `organization_name` | `string \| undefined` | Optional |
| `Status` | `UserStatus` | `status` | `UserStatus` | Enum |
| `MFAEnabled` | `bool` | `mfa_enabled` | `boolean` | - |
| `FailedLoginAttempts` | `int` | `failed_login_attempts` | `number \| undefined` | Optional |
| `LockedUntil` | `*time.Time` | `locked_until` | `string \| undefined` | Optional timestamp |
| `LastLoginAt` | `*time.Time` | `last_login_at` | `string \| undefined` | Optional timestamp |
| `EmailVerified` | `bool` | `email_verified` | `boolean` | - |
| `CreatedAt` | `time.Time` | `created_at` | `string` | Timestamp |
| `UpdatedAt` | `time.Time` | `updated_at` | `string` | Timestamp |
| `Roles` | `[]UserRole` | `roles` | `UserRole[] \| undefined` | Relationship |
| `APIKeys` | `[]APIKey` | `api_keys` | `APIKey[] \| undefined` | Relationship |

**Enum Mappings**:
- `UserStatus`: active, inactive, suspended, locked
- `Role`: admin, trader, viewer, auditor
- `APIKeyStatus`: active, inactive, expired, revoked

#### UserRole
**Backend**: `internal/domain/user/user.go` - `UserRole` struct
**Frontend**: `custodial-admin/src/core/entities/user.entity.ts` - `UserRole` interface

| Backend Field | Backend Type | Frontend Field | Frontend Type |
|--------------|-------------|----------------|---------------|
| `ID` | `uuid.UUID` | `id` | `string` |
| `UserID` | `uuid.UUID` | `user_id` | `string` |
| `Role` | `Role` | `role` | `Role` |
| `Permissions` | `[]string` | `permissions` | `string[]` |
| `CreatedAt` | `time.Time` | `created_at` | `string` |
| `UpdatedAt` | `time.Time` | `updated_at` | `string` |

#### APIKey
**Backend**: `internal/domain/user/user.go` - `APIKey` struct
**Frontend**: `custodial-admin/src/core/entities/user.entity.ts` - `APIKey` interface

| Backend Field | Backend Type | Frontend Field | Frontend Type |
|--------------|-------------|----------------|---------------|
| `ID` | `uuid.UUID` | `id` | `string` |
| `UserID` | `uuid.UUID` | `user_id` | `string` |
| `AccessKey` | `string` | `access_key` | `string` |
| `Scopes` | `[]string` | `scopes` | `string[]` |
| `IPWhitelist` | `[]string` | `ip_whitelist` | `string[] \| undefined` |
| `Status` | `APIKeyStatus` | `status` | `APIKeyStatus` |
| `ExpiresAt` | `*time.Time` | `expires_at` | `string \| undefined` |
| `LastUsedAt` | `*time.Time` | `last_used_at` | `string \| undefined` |
| `CreatedAt` | `time.Time` | `created_at` | `string` |
| `UpdatedAt` | `time.Time` | `updated_at` | `string` |

### Wallet Domain

#### Wallet
**Backend**: `internal/domain/wallet/wallet.go` - `Wallet` struct
**Frontend**: `custodial-admin/src/core/entities/wallet.entity.ts` - `Wallet` interface

| Backend Field | Backend Type | Frontend Field | Frontend Type | Notes |
|--------------|-------------|----------------|---------------|-------|
| `ID` | `uuid.UUID` | `id` | `string` | Primary key |
| `OrganizationID` | `uuid.UUID` | `organization_id` | `string` | - |
| `Name` | `string` | `name` | `string` | - |
| `Type` | `WalletType` | `type` | `WalletType` | Enum |
| `Currency` | `string` | `currency` | `string` | BTC, ETH, etc. |
| `Balance` | `decimal.Decimal` | `balance` | `string` | - |
| `LockedBalance` | `decimal.Decimal` | `locked_balance` | `string` | - |
| `Status` | `WalletStatus` | `status` | `WalletStatus` | Enum |
| `MaxDailyLimit` | `decimal.Decimal` | `max_daily_limit` | `string \| undefined` | Optional |
| `CurrentDailyUsage` | `decimal.Decimal` | `current_daily_usage` | `string` | - |
| `LastResetAt` | `time.Time` | `last_reset_at` | `string` | - |
| `ParentWalletID` | `*uuid.UUID` | `parent_wallet_id` | `string \| undefined` | Optional |
| `IsPoolParent` | `bool` | `is_pool_parent` | `boolean` | - |
| `PoolType` | `*PoolType` | `pool_type` | `string \| undefined` | Optional |
| `CreatedAt` | `time.Time` | `created_at` | `string` | - |
| `UpdatedAt` | `time.Time` | `updated_at` | `string` | - |

**Enum Mappings**:
- `WalletType`: hot, warm, cold
- `WalletStatus`: active, inactive, frozen, migrating
- `AddressType`: deposit, change, cold, hot
- `TransitionStatus`: pending, approved, completed, rejected

#### WalletAddress
**Backend**: `internal/domain/wallet/wallet.go` - `WalletAddress` struct
**Frontend**: `custodial-admin/src/core/entities/wallet.entity.ts` - `WalletAddress` interface

| Backend Field | Backend Type | Frontend Field | Frontend Type |
|--------------|-------------|----------------|---------------|
| `ID` | `uuid.UUID` | `id` | `string` |
| `WalletID` | `uuid.UUID` | `wallet_id` | `string` |
| `Address` | `string` | `address` | `string` |
| `AddressType` | `AddressType` | `address_type` | `AddressType` |
| `DerivationPath` | `string` | `derivation_path` | `string \| undefined` |
| `IsActive` | `bool` | `is_active` | `boolean` |
| `LastUsedAt` | `*time.Time` | `last_used_at` | `string \| undefined` |
| `CreatedAt` | `time.Time` | `created_at` | `string` |

#### WalletPolicy
**Backend**: `internal/domain/wallet/wallet.go` - `WalletPolicy` struct
**Frontend**: `custodial-admin/src/core/entities/wallet.entity.ts` - `WalletPolicy` interface

| Backend Field | Backend Type | Frontend Field | Frontend Type |
|--------------|-------------|----------------|---------------|
| `ID` | `uuid.UUID` | `id` | `string` |
| `WalletID` | `uuid.UUID` | `wallet_id` | `string` |
| `MinApprovers` | `int` | `min_approvers` | `number` |
| `MaxDailyLimit` | `decimal.Decimal` | `max_daily_limit` | `string \| undefined` |
| `MaxSingleTx` | `decimal.Decimal` | `max_single_tx` | `string \| undefined` |
| `AllowedAddresses` | `[]string` | `allowed_addresses` | `string[] \| undefined` |
| `CooldownPeriod` | `int` | `cooldown_period` | `number \| undefined` |
| `RequiresMFA` | `bool` | `requires_mfa` | `boolean` |
| `IPWhitelist` | `[]string` | `ip_whitelist` | `string[] \| undefined` |
| `TimeRestrictions` | `string` | `time_restrictions` | `string \| undefined` |
| `CreatedAt` | `time.Time` | `created_at` | `string` |
| `UpdatedAt` | `time.Time` | `updated_at` | `string` |

#### WalletTransition
**Backend**: `internal/domain/wallet/wallet.go` - `WalletTransition` struct
**Frontend**: `custodial-admin/src/core/entities/wallet.entity.ts` - `WalletTransition` interface

| Backend Field | Backend Type | Frontend Field | Frontend Type |
|--------------|-------------|----------------|---------------|
| `ID` | `uuid.UUID` | `id` | `string` |
| `WalletID` | `uuid.UUID` | `wallet_id` | `string` |
| `FromType` | `WalletType` | `from_type` | `WalletType` |
| `ToType` | `WalletType` | `to_type` | `WalletType` |
| `Reason` | `string` | `reason` | `string \| undefined` |
| `InitiatedBy` | `uuid.UUID` | `initiated_by` | `string` |
| `ApprovedBy` | `[]uuid.UUID` | `approved_by` | `string[] \| undefined` |
| `Status` | `TransitionStatus` | `status` | `TransitionStatus` |
| `CompletedAt` | `*time.Time` | `completed_at` | `string \| undefined` |
| `CreatedAt` | `time.Time` | `created_at` | `string` |

### Transaction Domain

#### Transaction
**Backend**: `internal/domain/transaction/transaction.go` - `Transaction` struct
**Frontend**: `custodial-admin/src/core/entities/transaction.entity.ts` - `Transaction` interface

| Backend Field | Backend Type | Frontend Field | Frontend Type | Notes |
|--------------|-------------|----------------|---------------|-------|
| `ID` | `uuid.UUID` | `id` | `string` | Primary key |
| `WalletID` | `uuid.UUID` | `wallet_id` | `string` | - |
| `BatchID` | `*uuid.UUID` | `batch_id` | `string \| undefined` | Optional |
| `Type` | `TransactionType` | `type` | `TransactionType` | Enum |
| `FromAddress` | `string` | `from_address` | `string \| undefined` | Optional |
| `ToAddress` | `string` | `to_address` | `string` | - |
| `Amount` | `decimal.Decimal` | `amount` | `string` | - |
| `EstimatedFee` | `decimal.Decimal` | `estimated_fee` | `string` | - |
| `ActualFee` | `*decimal.Decimal` | `actual_fee` | `string \| undefined` | Optional |
| `Currency` | `string` | `currency` | `string` | - |
| `Status` | `TransactionStatus` | `status` | `TransactionStatus` | Enum |
| `TxHash` | `string` | `tx_hash` | `string \| undefined` | Optional |
| `RiskScore` | `int` | `risk_score` | `number \| undefined` | 0-100 |
| `RequiresApprovals` | `int` | `requires_approvals` | `number` | - |
| `CurrentApprovals` | `int` | `current_approvals` | `number` | - |
| `ExpiresAt` | `*time.Time` | `expires_at` | `string \| undefined` | Optional |
| `Metadata` | `map[string]interface{}` | `metadata` | `Record<string, unknown> \| undefined` | JSON |
| `ErrorMessage` | `string` | `error_message` | `string \| undefined` | Optional |
| `CreatedAt` | `time.Time` | `created_at` | `string` | - |
| `UpdatedAt` | `time.Time` | `updated_at` | `string` | - |
| `CompletedAt` | `*time.Time` | `completed_at` | `string \| undefined` | Optional |

**Enum Mappings**:
- `TransactionType`: deposit, withdrawal, transfer, stake, unstake, governance
- `TransactionStatus`: pending, approved, processing, completed, failed, rejected, cancelled
- `ApprovalStatus`: pending, approved, rejected
- `FeeType`: network, platform, priority
- `BatchStatus`: pending, processing, completed, partial, failed

#### TransactionApproval
**Backend**: `internal/domain/transaction/transaction.go` - `TransactionApproval` struct
**Frontend**: `custodial-admin/src/core/entities/transaction.entity.ts` - `TransactionApproval` interface

| Backend Field | Backend Type | Frontend Field | Frontend Type |
|--------------|-------------|----------------|---------------|
| `ID` | `uuid.UUID` | `id` | `string` |
| `TransactionID` | `uuid.UUID` | `transaction_id` | `string` |
| `ApproverID` | `uuid.UUID` | `approver_id` | `string` |
| `Status` | `ApprovalStatus` | `status` | `ApprovalStatus` |
| `IPAddress` | `string` | `ip_address` | `string \| undefined` |
| `UserAgent` | `string` | `user_agent` | `string \| undefined` |
| `MFAVerified` | `bool` | `mfa_verified` | `boolean` |
| `Signature` | `string` | `signature` | `string \| undefined` |
| `Comments` | `string` | `comments` | `string \| undefined` |
| `ApprovedAt` | `*time.Time` | `approved_at` | `string \| undefined` |
| `CreatedAt` | `time.Time` | `created_at` | `string` |

#### TransactionFee
**Backend**: `internal/domain/transaction/transaction.go` - `TransactionFee` struct
**Frontend**: `custodial-admin/src/core/entities/transaction.entity.ts` - `TransactionFee` interface

| Backend Field | Backend Type | Frontend Field | Frontend Type |
|--------------|-------------|----------------|---------------|
| `ID` | `uuid.UUID` | `id` | `string` |
| `TransactionID` | `uuid.UUID` | `transaction_id` | `string` |
| `FeeAmount` | `decimal.Decimal` | `fee_amount` | `string` |
| `FeeCurrency` | `string` | `fee_currency` | `string` |
| `GasPrice` | `*decimal.Decimal` | `gas_price` | `string \| undefined` |
| `GasUsed` | `*int64` | `gas_used` | `number \| undefined` |
| `FeeType` | `FeeType` | `fee_type` | `FeeType` |
| `CreatedAt` | `time.Time` | `created_at` | `string` |

#### TransactionBatch
**Backend**: `internal/domain/transaction/transaction.go` - `TransactionBatch` struct
**Frontend**: `custodial-admin/src/core/entities/transaction.entity.ts` - `TransactionBatch` interface

| Backend Field | Backend Type | Frontend Field | Frontend Type |
|--------------|-------------|----------------|---------------|
| `ID` | `uuid.UUID` | `id` | `string` |
| `OrganizationID` | `uuid.UUID` | `organization_id` | `string` |
| `Name` | `string` | `name` | `string \| undefined` |
| `TotalCount` | `int` | `total_count` | `number` |
| `ApprovedCount` | `int` | `approved_count` | `number` |
| `CompletedCount` | `int` | `completed_count` | `number` |
| `FailedCount` | `int` | `failed_count` | `number` |
| `Status` | `BatchStatus` | `status` | `BatchStatus` |
| `CreatedBy` | `uuid.UUID` | `created_by` | `string` |
| `CreatedAt` | `time.Time` | `created_at` | `string` |
| `UpdatedAt` | `time.Time` | `updated_at` | `string` |
| `CompletedAt` | `*time.Time` | `completed_at` | `string \| undefined` |

### Blockchain Domain

#### BlockchainTransaction
**Backend**: `internal/domain/blockchain/blockchain.go` - `BlockchainTransaction` struct
**Frontend**: `custodial-admin/src/core/entities/blockchain.entity.ts` - `BlockchainTransaction` interface

| Backend Field | Backend Type | Frontend Field | Frontend Type | Notes |
|--------------|-------------|----------------|---------------|-------|
| `ID` | `uuid.UUID` | `id` | `string` | Primary key |
| `InternalTxID` | `uuid.UUID` | `internal_tx_id` | `string` | References Transaction |
| `WalletID` | `uuid.UUID` | `wallet_id` | `string` | - |
| `Chain` | `Chain` | `chain` | `Chain` | BTC, ETH, etc. |
| `TxHash` | `string` | `tx_hash` | `string` | Unique |
| `FromAddress` | `string` | `from_address` | `string` | - |
| `ToAddress` | `string` | `to_address` | `string` | - |
| `Amount` | `decimal.Decimal` | `amount` | `string` | - |
| `Fee` | `decimal.Decimal` | `fee` | `string` | - |
| `BlockNumber` | `int64` | `block_number` | `number` | - |
| `BlockHash` | `string` | `block_hash` | `string` | - |
| `Confirmations` | `int` | `confirmations` | `number` | - |
| `Status` | `BlockchainTransactionStatus` | `status` | `BlockchainTransactionStatus` | Enum |
| `GasUsed` | `*int64` | `gas_used` | `number \| undefined` | Optional |
| `GasPrice` | `*decimal.Decimal` | `gas_price` | `string \| undefined` | Optional |
| `Nonce` | `*int64` | `nonce` | `number \| undefined` | Optional |
| `RawData` | `string` | `raw_data` | `string \| undefined` | JSON |
| `ErrorMessage` | `string` | `error_message` | `string \| undefined` | Optional |
| `FirstSeenAt` | `time.Time` | `first_seen_at` | `string` | - |
| `ConfirmedAt` | `*time.Time` | `confirmed_at` | `string \| undefined` | Optional |
| `LastCheckedAt` | `time.Time` | `last_checked_at` | `string` | - |
| `CreatedAt` | `time.Time` | `created_at` | `string` | - |
| `UpdatedAt` | `time.Time` | `updated_at` | `string` | - |

**Enum Mappings**:
- `Chain`: BTC, ETH, MATIC, BNB, LTC
- `BlockchainTransactionStatus`: pending, confirming, confirmed, failed, dropped
- `DepositStatus`: detected, confirming, confirmed, credited, failed
- `WithdrawalStatus`: pending, broadcasting, broadcasted, failed

### Security Domain

#### AuditLog
**Backend**: `internal/domain/security/security.go` - `AuditLog` struct
**Frontend**: `custodial-admin/src/core/entities/audit-log.entity.ts` - `AuditLog` interface

| Backend Field | Backend Type | Frontend Field | Frontend Type |
|--------------|-------------|----------------|---------------|
| `ID` | `uuid.UUID` | `id` | `string` |
| `UserID` | `*uuid.UUID` | `user_id` | `string \| undefined` |
| `Action` | `string` | `action` | `string` |
| `ResourceType` | `string` | `resource_type` | `string` |
| `ResourceID` | `*uuid.UUID` | `resource_id` | `string \| undefined` |
| `Changes` | `map[string]interface{}` | `changes` | `Record<string, unknown> \| undefined` |
| `IPAddress` | `string` | `ip_address` | `string \| undefined` |
| `UserAgent` | `string` | `user_agent` | `string \| undefined` |
| `Result` | `AuditResult` | `result` | `AuditResult` |
| `Severity` | `AuditSeverity` | `severity` | `AuditSeverity` |
| `Metadata` | `map[string]interface{}` | `metadata` | `Record<string, unknown> \| undefined` |
| `CreatedAt` | `time.Time` | `created_at` | `string` |

**Enum Mappings**:
- `AuditResult`: success, failure, denied
- `AuditSeverity`: info, warning, critical

#### SecurityAlert
**Backend**: `internal/domain/security/security.go` - `SecurityAlert` struct
**Frontend**: `custodial-admin/src/core/entities/security.entity.ts` - `SecurityAlert` interface

| Backend Field | Backend Type | Frontend Field | Frontend Type |
|--------------|-------------|----------------|---------------|
| `ID` | `uuid.UUID` | `id` | `string` |
| `AlertType` | `AlertType` | `alert_type` | `AlertType` |
| `Severity` | `AlertSeverity` | `severity` | `AlertSeverity` |
| `ResourceType` | `string` | `resource_type` | `string \| undefined` |
| `ResourceID` | `*uuid.UUID` | `resource_id` | `string \| undefined` |
| `Description` | `string` | `description` | `string` |
| `Metadata` | `map[string]interface{}` | `metadata` | `Record<string, unknown> \| undefined` |
| `Resolved` | `bool` | `resolved` | `boolean` |
| `ResolvedBy` | `*uuid.UUID` | `resolved_by` | `string \| undefined` |
| `ResolvedAt` | `*time.Time` | `resolved_at` | `string \| undefined` |
| `CreatedAt` | `time.Time` | `created_at` | `string` |
| `UpdatedAt` | `time.Time` | `updated_at` | `string` |

**Enum Mappings**:
- `AlertType`: unauthorized_access, suspicious_transaction, anomalous_activity, failed_login, large_transaction, velocity_check, ip_change, mfa_disabled
- `AlertSeverity`: low, medium, high, critical

### Staking Domain

#### StakingPool
**Backend**: `internal/domain/staking/staking.go` - `StakingPool` struct
**Frontend**: `custodial-admin/src/core/entities/staking.entity.ts` - `StakingPool` interface

| Backend Field | Backend Type | Frontend Field | Frontend Type |
|--------------|-------------|----------------|---------------|
| `ID` | `uuid.UUID` | `id` | `string` |
| `Currency` | `string` | `currency` | `string` |
| `Name` | `string` | `name` | `string` |
| `Description` | `string` | `description` | `string \| undefined` |
| `APY` | `decimal.Decimal` | `apy` | `string` |
| `MinAmount` | `decimal.Decimal` | `min_amount` | `string` |
| `MaxAmount` | `decimal.Decimal` | `max_amount` | `string \| undefined` |
| `LockPeriodDays` | `int` | `lock_period_days` | `number \| undefined` |
| `Status` | `PoolStatus` | `status` | `PoolStatus` |
| `TotalStaked` | `decimal.Decimal` | `total_staked` | `string` |
| `TotalStakers` | `int` | `total_stakers` | `number` |
| `CreatedAt` | `time.Time` | `created_at` | `string` |
| `UpdatedAt` | `time.Time` | `updated_at` | `string` |

**Enum Mappings**:
- `PoolStatus`: active, inactive, full, closed
- `PositionStatus`: active, unstaking, unstaked, locked

#### StakingPosition
**Backend**: `internal/domain/staking/staking.go` - `StakingPosition` struct
**Frontend**: `custodial-admin/src/core/entities/staking.entity.ts` - `StakingPosition` interface

| Backend Field | Backend Type | Frontend Field | Frontend Type |
|--------------|-------------|----------------|---------------|
| `ID` | `uuid.UUID` | `id` | `string` |
| `WalletID` | `uuid.UUID` | `wallet_id` | `string` |
| `PoolID` | `uuid.UUID` | `pool_id` | `string` |
| `Amount` | `decimal.Decimal` | `amount` | `string` |
| `RewardsEarned` | `decimal.Decimal` | `rewards_earned` | `string` |
| `UnclaimedRewards` | `decimal.Decimal` | `unclaimed_rewards` | `string` |
| `StakedAt` | `time.Time` | `staked_at` | `string` |
| `UnstakeRequestedAt` | `*time.Time` | `unstake_requested_at` | `string \| undefined` |
| `UnlocksAt` | `*time.Time` | `unlocks_at` | `string \| undefined` |
| `Status` | `PositionStatus` | `status` | `PositionStatus` |
| `AutoCompound` | `bool` | `auto_compound` | `boolean` |
| `CreatedAt` | `time.Time` | `created_at` | `string` |
| `UpdatedAt` | `time.Time` | `updated_at` | `string` |

### Governance Domain

#### GovernanceProposal
**Backend**: `internal/domain/governance/governance.go` - `GovernanceProposal` struct
**Frontend**: `custodial-admin/src/core/entities/governance.entity.ts` - `GovernanceProposal` interface

| Backend Field | Backend Type | Frontend Field | Frontend Type |
|--------------|-------------|----------------|---------------|
| `ID` | `uuid.UUID` | `id` | `string` |
| `Currency` | `string` | `currency` | `string` |
| `Title` | `string` | `title` | `string` |
| `Description` | `string` | `description` | `string` |
| `ProposalType` | `ProposalType` | `proposal_type` | `ProposalType` |
| `VotingStartsAt` | `time.Time` | `voting_starts_at` | `string` |
| `VotingEndsAt` | `time.Time` | `voting_ends_at` | `string` |
| `QuorumRequired` | `decimal.Decimal` | `quorum_required` | `string` |
| `Status` | `ProposalStatus` | `status` | `ProposalStatus` |
| `VotesFor` | `decimal.Decimal` | `votes_for` | `string` |
| `VotesAgainst` | `decimal.Decimal` | `votes_against` | `string` |
| `VotesAbstain` | `decimal.Decimal` | `votes_abstain` | `string` |
| `TotalVotes` | `decimal.Decimal` | `total_votes` | `string` |
| `CreatedBy` | `uuid.UUID` | `created_by` | `string` |
| `ExecutedAt` | `*time.Time` | `executed_at` | `string \| undefined` |
| `CreatedAt` | `time.Time` | `created_at` | `string` |
| `UpdatedAt` | `time.Time` | `updated_at` | `string` |

**Enum Mappings**:
- `ProposalType`: general, parameter_change, treasury_spend, upgrade
- `ProposalStatus`: draft, active, passed, rejected, executed, cancelled
- `VoteType`: for, against, abstain
- `DelegationStatus`: active, revoked

### Pool Domain

#### PooledWalletRelationship
**Backend**: `internal/domain/wallet/pooled_wallet.go` - `PooledWalletRelationship` struct
**Frontend**: `custodial-admin/src/core/entities/pool.entity.ts` - `PooledWalletRelationship` interface

| Backend Field | Backend Type | Frontend Field | Frontend Type |
|--------------|-------------|----------------|---------------|
| `ID` | `uuid.UUID` | `id` | `string` |
| `ParentWalletID` | `uuid.UUID` | `parent_wallet_id` | `string` |
| `ChildWalletID` | `uuid.UUID` | `child_wallet_id` | `string` |
| `RelationType` | `RelationType` | `relation_type` | `RelationType` |
| `Description` | `string` | `description` | `string \| undefined` |
| `Status` | `RelationStatus` | `status` | `RelationStatus` |
| `PermissionLevel` | `PermissionLevel` | `permission_level` | `PermissionLevel` |
| `CreatedBy` | `uuid.UUID` | `created_by` | `string` |
| `CreatedAt` | `time.Time` | `created_at` | `string` |
| `UpdatedAt` | `time.Time` | `updated_at` | `string` |
| `ArchivedAt` | `*time.Time` | `archived_at` | `string \| undefined` |

**Enum Mappings**:
- `PoolType`: operational, custodial, staking, treasury
- `RelationType`: sub_wallet, derivative, operational, safekeeping
- `RelationStatus`: active, inactive, archived, suspended
- `PermissionLevel`: full, limited, read_only
- `PoolPolicyType`: daily_limit, per_tx_limit, approval_required, address_whitelist, risk_threshold
- `PolicyScope`: parent_only, children_only, both
- `TransferReason`: rebalance, consolidation, distribution, settlement, collateral
- `InternalTxStatus`: pending, processing, completed, failed, cancelled

## Special Considerations

### Date Handling

All dates from the backend are in `time.Time` format and are serialized to ISO 8601 strings in JSON. The frontend should:

1. Parse these strings using `new Date(dateString)` when needed
2. Format them using a date library like `date-fns` or native `Intl.DateTimeFormat`
3. Send dates back to the backend in ISO 8601 format

### UUID Handling

UUIDs are always strings in the frontend. When creating new entities, you can:

1. Let the backend generate UUIDs (recommended)
2. Use a library like `uuid` to generate them on the frontend if needed

### Decimal Precision

Financial amounts use `decimal.Decimal` on the backend and are serialized as strings to preserve precision. The frontend should:

1. Always store amounts as strings
2. Use a decimal library like `decimal.js` or `big.js` for calculations
3. Never use JavaScript `Number` type for financial calculations (floating-point errors)

### Optional vs Null vs Undefined

- Backend optional fields (pointers or `omitempty`) map to TypeScript optional (`field?:`) or union types (`field: type | undefined`)
- Backend `null` values are received as `null` in JSON
- TypeScript optional fields can be omitted entirely

### Enum Consistency

All enums must match exactly between backend and frontend:
- Backend: String constants
- Frontend: String enums
- Case-sensitive
- Values must match the backend JSON tags

### Relationships

Backend GORM relationships (one-to-many, many-to-many) are mapped to optional array fields in TypeScript. These are typically only included when specifically requested via query parameters or eager loading.

### Soft Deletes

Backend uses `gorm.DeletedAt` for soft deletes. These fields are:
- Never exposed in JSON (json:"-" tag)
- Filtered automatically by GORM queries
- Not present in frontend entities

## Validation

The frontend should validate data before sending to the backend:

1. **Required fields**: Check all non-optional fields are present
2. **UUIDs**: Validate UUID format using regex or UUID library
3. **Enums**: Ensure values match the defined enums
4. **Numbers**: Validate numeric ranges (e.g., risk_score 0-100)
5. **Strings**: Validate format (emails, addresses, etc.)
6. **Decimals**: Validate numeric format for string-based decimals

## Testing

When testing entity mappings:

1. Use backend mock data with exact JSON structure
2. Test deserialization of all optional fields
3. Test enum value matching
4. Test date parsing and formatting
5. Test decimal precision preservation

## Version Compatibility

This mapping is current as of the backend commit where all domain models were last updated. When backend models change:

1. Update the corresponding TypeScript interface
2. Update this mapping document
3. Add migration notes if breaking changes occur
4. Update tests to reflect new structure
