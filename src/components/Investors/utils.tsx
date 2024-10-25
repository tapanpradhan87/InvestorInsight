


export const COLOR_MAP = {
    "Infrastructure": "#FF7F0E",
    "Private Equity": "#1F77B4",
    "Real Estate": "#2CA02C",
    "Hedge Funds": "#D62728",
    "Natural Resources": "#9467BD",
    "Private Debt": "#8C564B",
};

export function formatNumber(num: number): string {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + 'B';
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + 'M';
    } else {
        return num.toString();
    }
}