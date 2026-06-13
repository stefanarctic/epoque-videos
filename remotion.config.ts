// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// 4K source clips need more time for the OffthreadVideo ffmpeg proxy to seek
// and extract frames; the default 30s timeout is too tight at high concurrency.
Config.setDelayRenderTimeoutInMilliseconds(120_000);
Config.setConcurrency(4);
Config.setOffthreadVideoCacheSizeInBytes(512 * 1024 * 1024);
