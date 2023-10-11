const autoResizeTextArea = (textArea: HTMLTextAreaElement) => {
    return Math.max(textArea?.value.split("\n").length, 1);
};
