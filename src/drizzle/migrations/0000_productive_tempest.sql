CREATE TYPE "public"."oauth_provides" AS ENUM('discord', 'github', 'google');--> statement-breakpoint
CREATE TYPE "public"."user_roles" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TYPE "public"."verdict_states" AS ENUM('pending', 'accepted', 'wrong_answer');--> statement-breakpoint
CREATE TABLE "contest_participants" (
	"contestId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"joinedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "contest_participants_contestId_userId_pk" PRIMARY KEY("contestId","userId")
);
--> statement-breakpoint
CREATE TABLE "contest_problems" (
	"contestId" uuid NOT NULL,
	"problemId" uuid NOT NULL,
	"addedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "contest_problems_contestId_problemId_pk" PRIMARY KEY("contestId","problemId")
);
--> statement-breakpoint
CREATE TABLE "contest" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"startTime" timestamp with time zone NOT NULL,
	"endTime" timestamp with time zone NOT NULL,
	"createdBy" uuid NOT NULL,
	"createdByName" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "problem_moderators" (
	"problemId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"assignedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "problem_moderators_problemId_userId_pk" PRIMARY KEY("problemId","userId")
);
--> statement-breakpoint
CREATE TABLE "problem" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"problemStatement" text NOT NULL,
	"inputFormat" text NOT NULL,
	"outputFormat" text NOT NULL,
	"constraints" text NOT NULL,
	"createdBy" uuid NOT NULL,
	"createdByName" text NOT NULL,
	"languages" text[] DEFAULT '{"cpp","python","java","c"}' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "submission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"problemId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"contestId" uuid,
	"language" text NOT NULL,
	"code" text NOT NULL,
	"submittedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"verdict" "verdict_states" DEFAULT 'pending' NOT NULL,
	"score" numeric(10, 2) DEFAULT '0' NOT NULL,
	"maxScore" numeric(10, 2) DEFAULT '100' NOT NULL,
	"executionTime" integer,
	"memoryUsage" integer,
	"compilationOutput" text,
	"runtimeOutput" text
);
--> statement-breakpoint
CREATE TABLE "test_case" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"problemId" uuid NOT NULL,
	"input" text NOT NULL,
	"output" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_oauth_accounts" (
	"userId" uuid NOT NULL,
	"provider" "oauth_provides" NOT NULL,
	"providerAccountId" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_oauth_accounts_providerAccountId_provider_pk" PRIMARY KEY("providerAccountId","provider"),
	CONSTRAINT "user_oauth_accounts_providerAccountId_unique" UNIQUE("providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text,
	"salt" text,
	"role" "user_roles" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "contest_participants" ADD CONSTRAINT "contest_participants_contestId_contest_id_fk" FOREIGN KEY ("contestId") REFERENCES "public"."contest"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contest_participants" ADD CONSTRAINT "contest_participants_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contest_problems" ADD CONSTRAINT "contest_problems_contestId_contest_id_fk" FOREIGN KEY ("contestId") REFERENCES "public"."contest"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contest_problems" ADD CONSTRAINT "contest_problems_problemId_problem_id_fk" FOREIGN KEY ("problemId") REFERENCES "public"."problem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contest" ADD CONSTRAINT "contest_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "problem_moderators" ADD CONSTRAINT "problem_moderators_problemId_problem_id_fk" FOREIGN KEY ("problemId") REFERENCES "public"."problem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "problem_moderators" ADD CONSTRAINT "problem_moderators_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "problem" ADD CONSTRAINT "problem_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submission" ADD CONSTRAINT "submission_problemId_problem_id_fk" FOREIGN KEY ("problemId") REFERENCES "public"."problem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submission" ADD CONSTRAINT "submission_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submission" ADD CONSTRAINT "submission_contestId_contest_id_fk" FOREIGN KEY ("contestId") REFERENCES "public"."contest"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_case" ADD CONSTRAINT "test_case_problemId_problem_id_fk" FOREIGN KEY ("problemId") REFERENCES "public"."problem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_oauth_accounts" ADD CONSTRAINT "user_oauth_accounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;