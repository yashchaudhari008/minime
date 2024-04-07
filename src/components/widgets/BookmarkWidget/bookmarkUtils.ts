export const getFaviconLink = (bookmarkLink: string) => {
	try {
		const linkHost = new URL(bookmarkLink).hostname;
		return `https://icons.duckduckgo.com/ip3/${linkHost}.ico`;
	} catch {
		return "https://placehold.co/24/202124/FFF?text=>";
	}
};

export const getConfirmDialogMessage = (link: string, name?: string) => {
	return `${name && `${name}\n`}${link}\n\nAre you sure you want to delete bookmark?`;
};
