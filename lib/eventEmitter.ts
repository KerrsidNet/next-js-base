"use client"
import EventEmitter from "events";

// Create a class for the singleton event emitter
class SingletonEventEmitter extends EventEmitter {
    private static instance: SingletonEventEmitter;

    // Private constructor to prevent instantiation
    private constructor() {
        super();
    }

    // Static method to get the singleton instance
    public static getInstance(): SingletonEventEmitter {
        if (!SingletonEventEmitter.instance) {
            SingletonEventEmitter.instance = new SingletonEventEmitter();
        }
        return SingletonEventEmitter.instance;
    }

    /**
 * Adds an event listener for the given event name.
 * @param eventName The name of the event to listen for.
 * @param listener The callback function to invoke when the event is emitted.
 */
    public addEventListener(eventName: string, listener: (...args: any[]) => void): void {
        this.on(eventName, listener);
    }

    // Method to remove event listener
    public removeEventListener(eventName: string, listener: (...args: any[]) => void): void {
        this.off(eventName, listener);
    }
}

// Export the singleton instance
export const eventEmitter = SingletonEventEmitter.getInstance();