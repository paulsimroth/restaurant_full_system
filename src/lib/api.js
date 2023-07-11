//@ts-ignore
export const sendForm = async (data) => fetch('api/contact', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
}).then((res) => {
    if (!res.ok) throw new Error("Failed to submit message");
    return res.json();
});

//@ts-ignore
export const sendBookingForm = async (data) => fetch('api/booking', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
}).then((res) => {
    if (!res.ok) throw new Error("Failed to submit booking");
    return res.json();
});