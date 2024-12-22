<!-- Contact Form -->
<div class="row bg-pink">
    <div class="col-xl-3"></div>
    <div id="contact-form" class="col-xl-6 my-5 px-5">
        <h2 class="text-center mb-4" style="color: white;">Contact Us</h2>
        <form
                method="POST"
                action="/api/v1/contact"
                class="needs-validation"
                novalidate
        >
            <div class="row">
                <div class="mb-3 col-xl-6">
                    <label for="fname" class="form-label">First Name</label>
                    <input
                            type="text"
                            class="form-control"
                            id="fname"
                            name="fname"
                            required
                    />
                    <div class="invalid-feedback">Please provide your first name.</div>
                </div>
                <div class="mb-3 col-xl-6">
                    <label for="lname" class="form-label">Last Name</label>
                    <input
                            type="text"
                            class="form-control"
                            id="lname"
                            name="lname"
                            required
                    />
                    <div class="invalid-feedback">Please provide your last name.</div>
                </div>
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                        type="email"
                        class="form-control"
                        id="email"
                        name="email"
                        required
                />
                <div class="invalid-feedback">Please provide a valid email address.</div>
            </div>
            <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input
                        type="phone"
                        class="form-control"
                        id="phone"
                        name="phone"
                        required
                />
                <div class="invalid-feedback">Please provide a valid email address.</div>
            </div>
            <div class="mb-3">
                <label for="message" class="form-label">Message</label>
                <textarea
                        class="form-control"
                        id="message"
                        name="message"
                        rows="4"
                        required
                ></textarea>
                <div class="invalid-feedback">Please provide a message.</div>
            </div>
            <button
                    type="submit"
                    class="btn btn-primary w-100"
                    style="background-color: #6D604E; border: none;"
            >
                Submit
            </button>
        </form>
    </div>
    <div class="col-xl-3"></div>
</div>

<style>
    label {
        color: white;
    }
</style>
