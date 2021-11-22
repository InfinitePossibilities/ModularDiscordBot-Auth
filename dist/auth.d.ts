import * as Discord from "discord.js";
export declare namespace main {
    class auth {
        private _user;
        constructor(user: Discord.User);
        isOwner: () => Promise<boolean>;
        /**
         * Returns true if a players ID matches that of the developer's IDs.
         * @param table
         * @param user
         */
        isDev: () => Promise<boolean>;
        /**
         * Returns true if a user has an admin role.
         * @param table
         * @param user
         */
        isAdmin: () => Promise<boolean>;
        /**
         * Returns true if user has a mod role.
         * @param table
         * @param user
         */
        isMod: () => Promise<boolean>;
        /**
         * Returns true if user is Dev/SuperAdmin/Admin/Mod
         * @param table
         * @param user
         */
        isEmpowered: () => Promise<boolean>;
    }
}
export declare namespace guild {
    class auth {
        private _guild;
        private _user;
        constructor(guild: Discord.Guild, user: Discord.User);
        /**
         * Returns true if a players ID matches that of the developer's IDs.
         * @param table
         * @param user
         */
        isDev: () => Promise<boolean>;
        /**
         * Returns true if a user is the Guild Owner
         * @param guild
         * @param user
         */
        isGuildOwner: () => boolean;
        /**
         * Returns true if a user has a local owner role.
         * @param table
         * @param user
         */
        isOwner: () => Promise<boolean>;
        /**
         * Returns true if a user has a local admin role.
         * @param table
         * @param user
         */
        isAdmin: () => Promise<boolean>;
        /**
         * Returns true if user has a local mod role.
         * @param table
         * @param user
         */
        isMod: () => Promise<boolean>;
        /**
         * Returns true if user is Dev/SuperAdmin/Admin/Mod
         * @param table
         * @param user
         */
        isEmpowered: () => Promise<boolean>;
        /**
         * Returns true if user is Opted In.
         * @param table
         * @param user
         */
        isProtectee: () => Promise<boolean>;
        /**
         * Returns true if a user is locally Request Blacklisted.
         * @param table
         * @param user
         * @param guild
         */
        isRequestBlacklisted: () => Promise<boolean>;
        /**
         * Returns true if a user ID is blacklisted.
         * @param table
         * @param user
         */
        isBlacklisted: () => Promise<boolean>;
        /**
         * Returns true if a user has a blacklisted role.
         * @param table
         * @param user
         */
        isAnnounceBlacklisted: () => Promise<boolean>;
        /**
         * Returns true if a user has revoked permissions.
         * @param table
         * @param user
         */
        isPermissionRevoked: () => Promise<boolean>;
        /**
         * Returns true if a user has a local role.
         * @param discord
         * @param user
         * @param role
         */
        hasRole: (_role: Discord.Role) => boolean;
    }
}
