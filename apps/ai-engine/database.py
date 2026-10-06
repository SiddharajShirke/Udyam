"""Read-only Prisma table access. Migrations remain exclusively Prisma-owned."""

import os
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine


def _async_database_url(database_url: str) -> str:
    if database_url.startswith("postgresql+asyncpg://"):
        return database_url
    if database_url.startswith("postgres://"):
        return "postgresql+asyncpg://" + database_url.removeprefix("postgres://")
    if database_url.startswith("postgresql://"):
        return "postgresql+asyncpg://" + database_url.removeprefix("postgresql://")
    raise ValueError("DATABASE_URL must be a PostgreSQL connection string")


class AiDatabase:
    """Async read-model gateway with a modest Supabase pool (5 + 2 overflow)."""
    def __init__(self, database_url: str | None = None) -> None:
        url = database_url or os.getenv("DATABASE_URL")
        if not url:
            raise RuntimeError("DATABASE_URL is required for database-backed AI endpoints")
        self.engine: AsyncEngine = create_async_engine(_async_database_url(url), pool_size=5, max_overflow=2, pool_pre_ping=True)

    async def get_problem(self, problem_id: str) -> dict | None:
        query = text('SELECT id, domain_tags, budget_max FROM "Problem" WHERE id = :problem_id')
        async with self.engine.connect() as connection:
            row = (await connection.execute(query, {"problem_id": problem_id})).mappings().first()
        return dict(row) if row else None

    async def get_approved_startups(self) -> list[dict]:
        query = text('SELECT id, domain_tags, trust_score FROM "Startup" WHERE verification_status = :status')
        async with self.engine.connect() as connection:
            rows = (await connection.execute(query, {"status": "APPROVED"})).mappings().all()
        return [dict(row) for row in rows]

    async def get_recent_login_events(self, entity_id: str | None = None) -> list[dict]:
        query = text('SELECT user_id, action, created_at FROM "AuditLog" WHERE created_at >= NOW() - INTERVAL \'6 days\' AND LOWER(action) LIKE \'login%\' AND (:entity_id IS NULL OR entity_id = :entity_id) ORDER BY created_at ASC')
        async with self.engine.connect() as connection:
            rows = (await connection.execute(query, {"entity_id": entity_id})).mappings().all()
        return [dict(row) for row in rows]

    async def close(self) -> None:
        await self.engine.dispose()
