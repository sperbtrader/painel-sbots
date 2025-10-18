import PricingComponent from '@/components/ui/Pricing/PricingSBOTS';
import { createClient } from '@/utils/supabase/server';
import { getUser, getSubscription } from '@/utils/supabase/queries';

export default async function PricingPage() {
  const supabase = createClient();
  const [user, subscription] = await Promise.all([
    getUser(supabase),
    getSubscription(supabase)
  ]);

  return (
    <PricingComponent
      user={user}
      subscription={subscription}
    />
  );
}

