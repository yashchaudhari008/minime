const ls_notepad_key = "minime/notepadContent";

export const getNotepadContent = () => {
	const localStorageNotepadContent = localStorage.getItem(ls_notepad_key);

	try {
		if (!localStorageNotepadContent) {
			console.log("No Notepad Content Found!");
			return "";
		}
		return localStorageNotepadContent;
	} catch (e) {
		console.error("Invalid Data:", e);
		return "";
	}
};

export const saveNotepadContent = (newContent: string) => {
	try {
		localStorage.setItem(ls_notepad_key, newContent);
	} catch (e) {
		console.error("Failed to save new content", e);
	}
};
