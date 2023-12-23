// apps/client/src/app/(browse)/(with-layout)/products/components/example.tsx

import {
  Checkbox,
  CheckboxField,
  CheckboxGroup,
} from '@/components/catalyst-ui-kit/typescript/checkbox';
import {
  Description,
  Fieldset,
  Label,
  Legend,
} from '@/components/catalyst-ui-kit/typescript/fieldset';
import { Text } from '@/components/catalyst-ui-kit/typescript/text';

export function UIExample() {
  return (
    <>
      <CheckboxField>
        <Checkbox
          name="discoverability"
          value="show_on_events_page"
          defaultChecked
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
        <Label>Show on events page</Label>
        <Description>Make this event visible on your profile.</Description>
      </CheckboxField>
    </>
  );
}
