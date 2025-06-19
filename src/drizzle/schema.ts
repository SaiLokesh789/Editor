import { relations } from "drizzle-orm"
import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"
import { Languages } from "@/features/editor/configure/defaultCodes"

export const userRoles = ["admin", "user"] as const
export type UserRole = (typeof userRoles)[number]
export const userRoleEnum = pgEnum("user_roles", userRoles)

export const UserTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text(),
  salt: text(),
  role: userRoleEnum().notNull().default("user"),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const userRelations = relations(UserTable, ({ many }) => ({
  oAuthAccounts: many(UserOAuthAccountTable),
}))

export const oAuthProviders = ["discord", "github", "google"] as const
export type OAuthProvider = (typeof oAuthProviders)[number]
export const oAuthProviderEnum = pgEnum("oauth_provides", oAuthProviders)

export const UserOAuthAccountTable = pgTable(
  "user_oauth_accounts",
  {
    userId: uuid()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    provider: oAuthProviderEnum().notNull(),
    providerAccountId: text().notNull().unique(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  t => [primaryKey({ columns: [t.providerAccountId, t.provider] })]
)

export const userOauthAccountRelationships = relations(
  UserOAuthAccountTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserOAuthAccountTable.userId],
      references: [UserTable.id],
    }),
  })
)

//Schema for the contest
export const contest = pgTable("contest", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text().notNull(),
  startTime: timestamp({ withTimezone: true }).notNull(),
  endTime: timestamp({ withTimezone: true }).notNull(),
  createdBy: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

//Schema for the problem statements
export const problem = pgTable("problem", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  description: text().notNull(),
  inputFormat: text().notNull(),
  outputFormat: text().notNull(),
  constraints: text().notNull(),
  moderators: text().array().notNull().default([]),
  testCaseIds: text().array().notNull().default([]),
  languages: text().array().notNull().default(Array.from(Languages)),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

//Schema for test cases
export const testCase = pgTable("test_case", {
  id: uuid().primaryKey().defaultRandom(),
  problemId: uuid()
    .notNull()
    .references(() => problem.id, { onDelete: "cascade" }),
  input: text().notNull(),
  output: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

//Schera for submissions
export const submission = pgTable("submission", {
  id: uuid().primaryKey().defaultRandom(),
  problemId: uuid().notNull().references(() => problem.id, { onDelete: "cascade" }),
  userId: uuid().notNull().references(() => UserTable.id, { onDelete: "cascade" }),
  language: text().notNull(),
  code: text().notNull(),
  submittedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  verdict: text().notNull().default("pending"), // Verdict can be "pending", "accepted", "wrong_answer", etc.
  score: text().notNull().default("0"), // Score can be a string to accommodate different formats
})