export default function RefundsPage() {
  return (
    <div className="w-full px-6 sm:px-8 lg:px-10 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center sm:text-left text-white">
        Refund & Cancellation Policy
      </h1>

      <p className="text-zinc-300 leading-relaxed mb-6">
        At NMG Tours, we value our customers and strive to provide transparent and fair refund and cancellation terms. Please read the following policy carefully to understand your rights and responsibilities when booking a tour or making a purchase with us.
      </p>

      <section className="space-y-4 text-zinc-400">
          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">
              1. Cancellations by Customers
            </h2>
            <p>
              Customers may cancel their booking up to 7 days prior to the scheduled tour date for a full refund. Cancellations made within 7 days of the tour will incur a 50% charge. No refunds will be issued for cancellations made within 24 hours of departure.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">
              2. Cancellations by NMG Tours
            </h2>
            <p>
              In the rare event that NMG Tours must cancel a tour due to unforeseen circumstances, customers will receive a full refund or the option to reschedule without additional cost.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">
              3. Refund Processing
            </h2>
            <p>
              Approved refunds will be processed within 5–10 business days using the original method of payment. If a third-party payment processor was used, please allow additional time based on their policies.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">
              4. Non-Refundable Purchases
            </h2>
            <p>
              Certain special events, discounted promotions, or group bookings may be non-refundable. These will be clearly identified at the time of purchase.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">
              5. Contact Us
            </h2>
            <p>
              For questions or assistance regarding refunds or cancellations, please contact our support team at{" "}
              <a href="mailto:support@nmgtours.com" className="text-zinc-200 hover:text-white underline">
                support@nmgtoursjam.com
              </a>.
            </p>
          </div>
        </section>
    </div>
  );
}
