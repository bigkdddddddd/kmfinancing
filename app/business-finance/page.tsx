import { ServicePage } from "../components";

export default function BusinessFinancePage() {
  return <ServicePage
    eyebrow="Business finance pathway"
    title="Finance options for business purchases."
    intro="Start with a clearer view of the amount required, purpose and the finance pathway that may suit."
    topic="Business finance"
    sourcePage="business_finance_page"
    bullets={["Business car finance", "Equipment finance", "Commercial enquiry", "Finance amount estimate"]}
  />;
}
