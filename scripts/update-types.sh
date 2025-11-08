#!/bin/bash

# Load environment variables from .env file if it exists
if [ -f .env ]; then
  set -a
  source .env
  set +a
fi

# Check if SUPABASE_PROJECT_REF is set
if [ -z "$SUPABASE_PROJECT_REF" ]; then
  echo "Error: SUPABASE_PROJECT_REF is not set."
  echo ""
  echo "Please create a .env file in the project root with:"
  echo "  SUPABASE_PROJECT_REF=your-project-ref"
  echo ""
  echo "You can find your project reference at:"
  echo "  https://supabase.com/dashboard/project/_/settings/general"
  echo ""
  echo "Or export it in your shell:"
  echo "  export SUPABASE_PROJECT_REF=your-project-ref"
  exit 1
fi

# Generate types
echo "Generating TypeScript types for project: $SUPABASE_PROJECT_REF"
supabase gen types typescript --project-id "$SUPABASE_PROJECT_REF" > app/types/database.types.ts

if [ $? -eq 0 ]; then
  echo "✓ Types generated successfully at app/types/database.types.ts"
else
  echo "✗ Failed to generate types. Please check:"
  echo "  1. Your Supabase project reference is correct"
  echo "  2. You have Supabase CLI installed (npm install -g supabase)"
  echo "  3. You're logged in to Supabase (supabase login)"
  exit 1
fi

