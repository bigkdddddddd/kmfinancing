import { ServicePage } from "../components";

export default function RefinancePage() {
  return <ServicePage
    eyebrow="Refinance pathway"
    title="Review your current loan and see what may be possible."
    intro="Compare your current position, rate assumptions, equity and goals before choosing the next step."
    topic="Refinance"
    sourcePage="refinance_page"
    bullets={["Loan review", "Rate comparison", "Equity position check", "Repayment estimate"]}
  />;
}
