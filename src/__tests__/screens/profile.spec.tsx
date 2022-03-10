import { render } from "@testing-library/react-native";

import { Profile } from "../../screens/Profile";

describe("Profile", () => {
  test("check if show correctly user input name placeholder", () => {
    const { debug } = render(<Profile />);

    debug();
  });
});
