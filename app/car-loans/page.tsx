import { ServicePage } from "../components";

export default function CarLoansPage() {
  return <ServicePage
    eyebrow="Car finance pathway"
    title="Car loans for your next vehicle, without the confusion."
    intro="Get a simple starting point for new cars, used cars, personal car finance, business vehicles and asset finance."
    topic="Car loan"
    sourcePage="car_loans_page"
    bullets={["New and used vehicle finance", "Personal car loan options", "Business vehicle finance", "Deposit and repayment estimate"]}
  />;
}
