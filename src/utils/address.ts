export function formatAddress(address: string | null | undefined): string {
  if (!address) return '';

  return address.split('\n').map(line => {
    return line.split(' ').map(word => {
      // Preserve special acronyms
      if (word.toUpperCase() === '(PO)' || word.toUpperCase() === '(PO),' || word.toUpperCase() === 'PO,') {
        return word.toUpperCase();
      }

      // Preserve hyphens and numbers, but fix ALL CAPS words
      if (word === word.toUpperCase() && word.match(/[A-Za-z]/)) {
        // If word has hyphens (like I-BACUS-TECH), split by hyphen and title case each part
        if (word.includes('-')) {
          return word.split('-').map(part => {
             // Exception for I-BACUS-TECH, just leave it if it's the company name?
             // The user showed "I-BACUS-TECH" as all caps in their example!
             if (word === 'I-BACUS-TECH' || word === 'I-BACUS-TECH,') return part;
             return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
          }).join('-');
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }

      return word;
    }).join(' ');
  }).join('\n');
}
