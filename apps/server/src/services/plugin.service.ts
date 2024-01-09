// apps/server/src/services/plugin.service.ts

import { Plugin } from '@shared/src';
import PluginModel from '../models/plugin.model';

class PluginService {
  static async createPlugin(pluginData): Promise<Plugin> {
    const newPlugin = await PluginModel.create(pluginData);

    if (!newPlugin) {
      throw new Error('Failed to create new plugin');
    }
    return newPlugin;
  }

  static async getAllApprovedPlugins(): Promise<Plugin[]> {
    // const plugins = await PluginModel.getAllApprovedPlugins(pluginData);
    const plugins = await PluginModel.getAllBy('isApproved', true);

    return plugins;
  }
}

export { PluginService };
