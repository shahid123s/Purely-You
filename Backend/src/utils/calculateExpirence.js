export function calculateExperience(registerYear) {
    // Parse the registerYear into a date
    const [year, month] = registerYear.split('-').map(Number);
    const registerDate = new Date(year, month - 1); // JS months are 0-indexed

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in years and months
    let years = currentDate.getFullYear() - registerDate.getFullYear();
    let months = currentDate.getMonth() - registerDate.getMonth();

    // Adjust if the current month is earlier than the register month
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return `${years} years and ${months} months`;
}