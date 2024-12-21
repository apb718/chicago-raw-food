

<!-- Contact Form -->
<div class="row bg-pink">
    <div class="col-xl-3"></div>
    <div id="contact-form" class="col-xl-6 my-5">
        <h2 class="text-center mb-4" style="color: white;">Contact Us</h2>
        <form class="needs-validation" novalidate>
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" name="name" required>
                <div class="invalid-feedback">Please provide your name.</div>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" required>
                <div class="invalid-feedback">Please provide a valid email address.</div>
            </div>
            <div class="mb-3">
                <label for="message" class="form-label">Message</label>
                <textarea class="form-control" id="message" name="message" rows="4" required></textarea>
                <div class="invalid-feedback">Please provide a message.</div>
            </div>
            <button type="submit" class="btn btn-primary w-100" style="background-color: #6D604E; border: none;">Submit</button>
        </form>
    </div>
    <div class="col-xl-3"></div>
</div>