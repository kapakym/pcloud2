export const handleCopyToClipboard = (value: string) => {
	navigator.clipboard.writeText(value)
}
