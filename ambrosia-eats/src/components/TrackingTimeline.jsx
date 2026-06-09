import { CheckCircle2, ChefHat, PackageCheck, Truck } from 'lucide-react'

const steps = [
  { label: 'Order Placed', icon: CheckCircle2 },
  { label: 'Preparing', icon: ChefHat },
  { label: 'Out for Delivery', icon: Truck },
  { label: 'Delivered', icon: PackageCheck },
]

export default function TrackingTimeline({ currentStep }) {
  return (
    <div className="tracking-timeline">
      {steps.map((step, index) => {
        const Icon = step.icon
        return (
          <div className={`timeline-step ${index <= currentStep ? 'active' : ''}`} key={step.label}>
            <span><Icon size={20} /></span>
            <strong>{step.label}</strong>
          </div>
        )
      })}
    </div>
  )
}
