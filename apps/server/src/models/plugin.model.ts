// apps/server/src/models/plugin.mpdel.ts

// apps/server/src/models/plugin.model.ts

import { Plugin } from '@shared/src';

import knex from '../config/database';

class PluginModel {
  private static tableName = 'plugins';

  // static async findBy(
  //   field: keyof Plugin,
  //   value: unknown
  // ): Promise<Plugin | null> {
  //   const plugin: Plugin | undefined = await knex(this.tableName)
  //     .where({ [field]: value })
  //     .first();

  //   return plugin || null;
  // }

  static async create(pluginData: Partial<Plugin>): Promise<Plugin> {
    const [newPlugin] = await knex(this.tableName)
      .insert(pluginData)
      .returning('*');

    return newPlugin;
  }

  static getAllBy(field: keyof Plugin, value: unknown): Plugin[] | null | any {
    return knex(this.tableName)
      .select('*')
      .where({
        [field]: value,
      });
  }

  // static async updateBy(
  //   // stripeCheckoutSessionId: string,
  //   field: keyof Plugin,
  //   value: unknown,
  //   pluginData: Partial<Plugin>
  // ): Promise<Plugin> {
  //   const updatedPlugins = await knex(this.tableName)
  //     .where({ [field]: value })
  //     .update(pluginData)
  //     .returning('*');

  //   return updatedPlugins[0];
  // }
}

export default PluginModel;
