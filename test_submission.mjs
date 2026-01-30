import fetch from 'node-fetch';

const WEBHOOK_URL = "https://n8n.srv1212707.hstgr.cloud/webhook/contact-form";

const payload = {
    firstName: "Test",
    lastName: "User",
    email: "contact@autoflowdigital.pl",
    phone: "123456789",
    description: "To jest testowe zgłoszenie sprawdzające integrację Telegrama i Emaila.",
    selectedDays: ["Poniedziałek"],
    selectedTimes: ["10:00 - 12:00"],
    timestamp: new Date().toISOString()
};

async function submitForm() {
    try {
        console.log(`Sending test data to ${WEBHOOK_URL}...`);
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log("✅ Success! Form submitted.");
            const text = await response.text();
            console.log("Response:", text);
        } else {
            console.error("❌ Failed:", response.status, response.statusText);
            const text = await response.text();
            console.log("Response:", text);
        }
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

submitForm();
