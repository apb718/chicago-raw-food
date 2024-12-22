import { log } from "$lib/server/logUtils.js";
import { json, redirect } from "@sveltejs/kit";
import {pool} from "$lib/db/mysql.js";
import {GOOGLE_EMAIL} from "$env/static/private";
import transporter from "$lib/server/emailSetup.js";


interface Contact {
    fname: FormDataEntryValue | null; // FormDataEntryValue covers string or File types
    lname: FormDataEntryValue | null;
    email: FormDataEntryValue | null;
    phone: FormDataEntryValue | null;
    message: FormDataEntryValue | null;
}







export const POST = async ({ request }) => {
    await log('INFO', 'POST request received for contact form');

    // Parse FormData
    const formData = await request.formData();
    const contact: Contact = {
        fname: formData.get('fname'),
        lname: formData.get('lname'),
        email: formData.get('email'),
        phone: formData.get('phone') || null,
        message: formData.get('message'),


    };
    // console.log(`${contact.fname} ${contact.lname} ${contact.email} ${contact.phone} ${contact.message}`);
    let html: string = `<h2>Contact Us Resopnse</h2>
                        <pre>
Name: ${contact.fname} ${contact.lname}
Email: ${contact.email}
Phone: ${contact.phone}

${contact.message}
                        </pre>`;

    const message = {
        from: GOOGLE_EMAIL,
        to: GOOGLE_EMAIL,
        subject: `Contact Form Submission from ${contact.email}`,
        text: `${contact.message}\nName: ${contact.fname} ${contact.lname}\nEmail: ${contact.email}\nPhone: ${contact.phone}`,
        html: html
    }


    const sendEmail = async (message: any) => {
        await new Promise((resolve, reject) => {
            transporter.sendMail(message, async (error: string, info: any) => {
                if (error) {
                    await log("WARN", `Error sending mail: ${error}`);
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });
    }
    await sendEmail(message);

    // Validate form data
    if (!contact.fname || !contact.lname || !contact.email || !contact.message) {
        return json({ status: 'error', message: 'All fields are required.' }, { status: 400 });
    }

    if(!insertData(contact)) {
        await log('WARN', `Error inserting data ${contact}`)
        return json({ status: 'error', message: 'Error inserting data to db' }, { status: 400 });
    }
    // Log success
    await log('INFO', `Contact form submission from ${contact.fname} ${contact.lname} (${contact.email}) (${contact.phone})`);

    // Option 1: Redirect to a thank-you page
    return new Response(redirect(303, '/connect/thank-you'));

};


const insertData = (contact : Contact) : boolean => {
    try {
        pool.query("INSERT INTO Feedback (fName, lName, email, phone, message) VALUES (?, ?, ?, ?, ?)",
            [
                contact.fname,
                contact.lname,
                contact.email,
                contact.phone,
                contact.message
            ]);
        return true;
    } catch (error) {
        return false;
    }
}
