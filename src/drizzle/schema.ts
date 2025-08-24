import { desc, relations, sql } from "drizzle-orm";
import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { Languages } from "@/features/editor/configure/defaultCodes";
import { check } from "drizzle-orm/mysql-core";

/*

Tables

*/

export const userRoles = ["admin", "user"] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user_roles", userRoles);

// Schema for the user table
export const UserTable = pgTable(
  "users",
  {
    id: uuid().primaryKey().defaultRandom(),
    username: text().notNull().unique(),
    name: text().notNull(),
    email: text().notNull().unique(),
    password: text(),
    salt: text(),
    role: userRoleEnum().notNull().default("user"),
    // Remove deprecated fields mentioned in TODO
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    // Add email validation constraint
    check(
      "valid_email",
      sql`${table.email} ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'`
    ),
    // Add username length constraint
    //TODO: Add username length constraint in the frontend
    check(
      "username_length",
      sql`length(${table.username}) >= 3 AND length(${table.username}) <= 30`
    ),
  ]
);

export const oAuthProviders = ["discord", "github", "google"] as const;
export type OAuthProvider = (typeof oAuthProviders)[number];
export const oAuthProviderEnum = pgEnum("oauth_provides", oAuthProviders);

// Schema for the user OAuth accounts table
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
  (t) => [primaryKey({ columns: [t.providerAccountId, t.provider] })]
);

// Relationships for the user OAuth accounts table
export const userOauthAccountRelationships = relations(
  UserOAuthAccountTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserOAuthAccountTable.userId],
      references: [UserTable.id],
    }),
  })
);

//Schema for the contest
export const ContestTable = pgTable("contest", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  startTime: timestamp({ withTimezone: true }).notNull(),
  endTime: timestamp({ withTimezone: true }).notNull(),
  createdBy: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  createdByName: text().notNull(),
  description: text()
    .notNull()
    .default(
      "Please provide a short description of your contest here! This will also be used as metadata."
    ),
  prizes: text()
    .notNull()
    .default(
      "- Prizes are optional. You may add any prizes that you would like to offer here."
    ),
  rules: text()
    .notNull()
    .default("- Please provide any rules for your contest here."),
  scoring: text()
    .notNull()
    .default(
      "- Each challenge has a pre-determined score./n- A participant’s score depends on the number of test cases a participant’s code submission successfully passes./n- If a participant submits more than one solution per challenge, then the participant’s score will reflect the highest score achieved. In a game challenge, the participant's score will reflect the last code submission./n- Participants are ranked by score. If two or more participants achieve the same score, then the tie is broken by the total time taken to submit the last solution resulting in a higher score"
    ),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

//Schema for the problem statements
export const ProblemTable = pgTable("problem", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  problemStatement: text().notNull(),
  inputFormat: text().notNull(),
  outputFormat: text().notNull(),
  constraints: text().notNull(),
  createdBy: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  createdByName: text().notNull(),
  languages: text().array().notNull().default(Array.from(Languages)),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

//Schema for test cases
export const TestCaseTable = pgTable("test_case", {
  id: uuid().primaryKey().defaultRandom(),
  problemId: uuid()
    .notNull()
    .references(() => ProblemTable.id, { onDelete: "cascade" }),
  input: text().notNull(),
  output: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const verdictStates = ["pending", "accepted", "wrong_answer"] as const;
export type verdictState = (typeof verdictStates)[number];
export const verdictStateEnum = pgEnum("verdict_states", verdictStates);

//Schema for submissions
export const SubmissionTable = pgTable(
  "submission",
  {
    id: uuid().primaryKey().defaultRandom(),
    problemId: uuid()
      .notNull()
      .references(() => ProblemTable.id, { onDelete: "cascade" }),
    userId: uuid()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    contestId: uuid().references(() => ContestTable.id, {
      onDelete: "cascade",
    }),
    language: text().notNull(),
    code: text().notNull(),
    submittedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    verdict: verdictStateEnum().notNull().default("pending"),
    score: numeric({ precision: 10, scale: 2 }).notNull().default("0"),
    maxScore: numeric({ precision: 10, scale: 2 }).notNull().default("100"),
    executionTime: integer(), // milliseconds
    memoryUsage: integer(), // KB
    compilationOutput: text(),
    runtimeOutput: text(),
  },
  (table) => [
    check(
      "valid_score",
      sql`${table.score} >= 0 AND ${table.score} <= ${table.maxScore}`
    ),
  ]
);

/*

Junction Tables

*/

// Junction table for problem moderators
export const ProblemModeratorsTable = pgTable(
  "problem_moderators",
  {
    problemId: uuid()
      .notNull()
      .references(() => ProblemTable.id, { onDelete: "cascade" }),
    userId: uuid()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    assignedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.problemId, table.userId] })]
);

// Junction table for contest participants
export const ContestParticipantsTable = pgTable(
  "contest_participants",
  {
    contestId: uuid()
      .notNull()
      .references(() => ContestTable.id, { onDelete: "cascade" }),
    userId: uuid()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    joinedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.contestId, table.userId] })]
);

// Junction table for contest problems
export const ContestProblemsTable = pgTable(
  "contest_problems",
  {
    contestId: uuid()
      .notNull()
      .references(() => ContestTable.id, { onDelete: "cascade" }),
    problemId: uuid()
      .notNull()
      .references(() => ProblemTable.id, { onDelete: "cascade" }),
    addedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.contestId, table.problemId] })]
);

/*

Relations

*/

// User relations
export const userRelations = relations(UserTable, ({ many }) => ({
  oAuthAccounts: many(UserOAuthAccountTable),
  moderatedProblems: many(ProblemModeratorsTable),
  participatedContests: many(ContestParticipantsTable),
  createdProblems: many(ProblemTable),
  createdContests: many(ContestTable),
  submissions: many(SubmissionTable),
}));

// Problem relations
export const problemRelations = relations(ProblemTable, ({ one, many }) => ({
  creator: one(UserTable, {
    fields: [ProblemTable.createdBy],
    references: [UserTable.id],
  }),
  moderators: many(ProblemModeratorsTable),
  testCases: many(TestCaseTable),
  submissions: many(SubmissionTable),
  contests: many(ContestProblemsTable),
}));

// Contest relations
export const contestRelations = relations(ContestTable, ({ one, many }) => ({
  creator: one(UserTable, {
    fields: [ContestTable.createdBy],
    references: [UserTable.id],
  }),
  participants: many(ContestParticipantsTable),
  problems: many(ContestProblemsTable),
  submissions: many(SubmissionTable),
}));

// Contest Participants relations
export const contestParticipantsRelations = relations(
  ContestParticipantsTable,
  ({ one }) => ({
    contest: one(ContestTable, {
      fields: [ContestParticipantsTable.contestId],
      references: [ContestTable.id],
    }),
    user: one(UserTable, {
      fields: [ContestParticipantsTable.userId],
      references: [UserTable.id],
    }),
  })
);

// Contest Problems relations
export const contestProblemsRelations = relations(
  ContestProblemsTable,
  ({ one }) => ({
    contest: one(ContestTable, {
      fields: [ContestProblemsTable.contestId],
      references: [ContestTable.id],
    }),
    problem: one(ProblemTable, {
      fields: [ContestProblemsTable.problemId],
      references: [ProblemTable.id],
    }),
  })
);

// Junction table relations
export const problemModeratorsRelations = relations(
  ProblemModeratorsTable,
  ({ one }) => ({
    problem: one(ProblemTable, {
      fields: [ProblemModeratorsTable.problemId],
      references: [ProblemTable.id],
    }),
    user: one(UserTable, {
      fields: [ProblemModeratorsTable.userId],
      references: [UserTable.id],
    }),
  })
);
