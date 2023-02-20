import { config as dotenv } from 'dotenv'
import { providers } from "ethers";

import { getEnv } from "../checkVerifiedContracts/utils";
import { getOmnichain } from "./getOmnichain";

async function main() {
  const provider = new providers.AlchemyProvider(
    "homestead",
    getEnv('CONFIG_ALCHEMY_API_KEY')
  );

  await getOmnichain(provider)
}

dotenv()
main().catch((e) => {
  console.error(e)
  process.exit(1)
})