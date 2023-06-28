from posthog.clickhouse.client.migration_tools import run_sql_with_exceptions
from posthog.models.session_replay_event.migrations_sql import (
    DROP_SESSION_REPLAY_EVENTS_TABLE_MV_SQL,
    DROP_KAFKA_SESSION_REPLAY_EVENTS_TABLE_SQL,
    ADD_SIZE_WRITABLE_SESSION_REPLAY_EVENTS_TABLE_SQL,
    ADD_SIZE_DISTRIBUTED_SESSION_REPLAY_EVENTS_TABLE_SQL,
    ADD_SIZE_SESSION_REPLAY_EVENTS_TABLE_SQL,
)
from posthog.models.session_replay_event.sql import (
    SESSION_REPLAY_EVENTS_TABLE_MV_SQL,
    KAFKA_SESSION_REPLAY_EVENTS_TABLE_SQL,
)

settings = {
    "max_execution_time": "43200",
}

operations = [
    # we have to drop materialized view first so that we're no longer pulling from kakfa
    # then we drop the kafka table
    run_sql_with_exceptions(DROP_SESSION_REPLAY_EVENTS_TABLE_MV_SQL()),
    run_sql_with_exceptions(DROP_KAFKA_SESSION_REPLAY_EVENTS_TABLE_SQL()),
    # now we can alter the target tables
    run_sql_with_exceptions(ADD_SIZE_WRITABLE_SESSION_REPLAY_EVENTS_TABLE_SQL(), settings=settings),
    run_sql_with_exceptions(ADD_SIZE_DISTRIBUTED_SESSION_REPLAY_EVENTS_TABLE_SQL(), settings=settings),
    run_sql_with_exceptions(ADD_SIZE_SESSION_REPLAY_EVENTS_TABLE_SQL(), settings=settings),
    # and then recreate the materialized views and kafka tables
    run_sql_with_exceptions(KAFKA_SESSION_REPLAY_EVENTS_TABLE_SQL()),
    run_sql_with_exceptions(SESSION_REPLAY_EVENTS_TABLE_MV_SQL()),
]
