use tauri_plugin_sql::{Migration, MigrationKind};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("The lantern is lit, {}.", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // The Lantern's memory: a practice journal, never a scoreboard.
    // Sessions record that practice happened -- growth is shown gently in
    // Insights, and the whole thing purges truly (license SS7).
    let migrations = vec![Migration {
        version: 1,
        description: "lantern_founding_schema",
        sql: "
            CREATE TABLE IF NOT EXISTS sessions (
                id TEXT PRIMARY KEY,
                started_at INTEGER NOT NULL,
                duration_min INTEGER,
                reference_name TEXT,
                outline_id TEXT,
                capture_path TEXT,
                note TEXT
            );
            CREATE INDEX IF NOT EXISTS idx_sessions_started
                ON sessions(started_at);

            CREATE TABLE IF NOT EXISTS refs (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                path TEXT NOT NULL,
                last_used INTEGER NOT NULL
            );
            CREATE INDEX IF NOT EXISTS idx_refs_used ON refs(last_used);
        ",
        kind: MigrationKind::Up,
    }];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:lantern.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running Resonance Lantern");
}