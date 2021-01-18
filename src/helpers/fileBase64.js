
export const fileBase64 = (bufferData) => {

	return btoa(
		new Uint8Array(bufferData)
			.reduce(
				(data, byte) => data + String.fromCharCode(byte), ''
			)
	);

}