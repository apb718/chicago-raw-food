<div class="bg-raw-pink py-10">
    <div class="container mx-auto max-w-3xl px-6">
        <h2 class="text-center text-3xl font-bold text-white mb-6">Contact Us</h2>
        <form
            method="POST"
            action="/api/v1/contact"
            class="space-y-6"
            novalidate
        >
            <!-- First and Last Name -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="fname" class="block text-sm font-medium text-white mb-2">First Name</label>
                    <input
                        type="text"
                        id="fname"
                        name="fname"
                        required
                        class="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    />
                    <div class="text-sm text-red-500 mt-1 hidden">Please provide your first name.</div>
                </div>
                <div>
                    <label for="lname" class="block text-sm font-medium text-white mb-2">Last Name</label>
                    <input
                        type="text"
                        id="lname"
                        name="lname"
                        required
                        class="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    />
                    <div class="text-sm text-red-500 mt-1 hidden">Please provide your last name.</div>
                </div>
            </div>

            <!-- Email -->
            <div>
                <label for="email" class="block text-sm font-medium text-white mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    class="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                />
                <div class="text-sm text-red-500 mt-1 hidden">Please provide a valid email address.</div>
            </div>

            <!-- Phone -->
            <div>
                <label for="phone" class="block text-sm font-medium text-white mb-2">Phone</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    required
                    class="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                />
                <div class="text-sm text-red-500 mt-1 hidden">Please provide a valid phone number.</div>
            </div>

            <!-- Message -->
            <div>
                <label for="message" class="block text-sm font-medium text-white mb-2">Message</label>
                <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    class="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                ></textarea>
                <div class="text-sm text-red-500 mt-1 hidden">Please provide a message.</div>
            </div>

            <!-- Submit Button -->
            <button
                type="submit"
                class="w-full py-3 bg-raw-green text-pink-500 font-bold rounded-lg hover:bg-green-500 focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50"
            >
                Submit
            </button>
        </form>
    </div>
</div>
