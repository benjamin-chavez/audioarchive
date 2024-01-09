// apps/server/src/controllers/plugin.conroller.ts

// apps/server/src/controllers/cart.controller.ts

import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { PluginService } from '../services/plugin.service';

export const createPlugin: RequestHandler = asyncHandler(async (req, res) => {
  // @ts-ignore
  // const authId = req.auth.sub;
  // const appUser = await MeService.getMe(authId);

  const { isApproved, ...rest } = req.body;
  const pluginData = { ...rest, isApproved: false };

  const newPlugin = await PluginService.createPlugin(pluginData);
  // const newPlugin = {};

  res
    .status(200)
    .json({ data: newPlugin, message: 'Successfully created plugin' });
});

export const getAllApprovedPlugins: RequestHandler = asyncHandler(
  async (req, res) => {
    const plugins = await PluginService.getAllApprovedPlugins();

    res.json({ data: plugins, message: 'Plugins retrieved successfully' });
  }
);
