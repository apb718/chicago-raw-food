export function capitalizeWords(str: string): string {
    return str
        // Convert entire string to lowercase (optional, if you want the rest of the letters to be lowercase)
        .toLowerCase()
        // Split into an array by spaces
        .split(" ")
        // Capitalize the first letter of each array element
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        // Join them back together with a space
        .join(" ");
}

