import { writeFile } from 'fs/promises';
import path from 'path';

type LogLevel = 'INFO' | 'WARN' | 'ERROR';

const logFilePath = path.resolve('./logs/crf.log'); // Adjust the log file path as needed

/**
 * Logs a message to the console and optionally writes it to a file.
 * @param level - The log level (INFO, WARN, ERROR).
 * @param message - The log message.
 * @param data - Additional data to log (optional).
 */
export async function log(level: LogLevel, message: string, data?: unknown): Promise<void> {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message} ${data ? JSON.stringify(data) : ''}`;

    // Log to the console
    console.log(logEntry);

    // Optionally log to a file
    try {
        await writeFile(logFilePath, logEntry + '\n', { flag: 'a' }); // Append to the log file
    } catch (err) {
        console.error(`[Log Utility] Failed to write to log file:`, err);
    }
}