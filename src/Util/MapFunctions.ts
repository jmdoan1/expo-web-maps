const extractSerializableData = `
function extractSerializableData(obj) {
    const seen = new WeakSet();

    function recurse(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        if (seen.has(obj)) {
            return;
        }

        seen.add(obj);

        if (Array.isArray(obj)) {
            return obj.map(recurse);
        }

        const serializableObj = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];

                if (value && typeof value === 'object') {
                    if (!seen.has(value)) {
                        serializableObj[key] = recurse(value);
                    }
                } else {
                    serializableObj[key] = value;
                }
            }
        }

        return serializableObj;
    }

    return recurse(obj);
}
  `;

const getLatLng = `
function getLatLng(latLng) {
  return {
    latitude: latLng.lat(), 
    longitude: latLng.lng()
  }
}
`;

const mapFunctions = extractSerializableData + getLatLng;

export default mapFunctions;
