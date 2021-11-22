// Last modified: 2021/11/21 19:47:51
import { User, Guild, Role } from "discord.js";
import { db, schemas } from "modulardiscordbot-db";

export namespace main {
    export class auth {
        private _user: User;

        constructor (user: User) {
            this._user = user;
        }

        isOwner = async () => {
            let _ownerIDs = String((await new db(schemas.main.coreMainModel(true)).readRecords(undefined, "owners"))[0].owners).split(',');

            if (_ownerIDs.indexOf(this._user.id) > -1) return true;
            return false;
        }

        /**
         * Returns true if a players ID matches that of the developer's IDs.
         * @param table
         * @param user 
         */
        isDev = async () => {
            let _devIDs = String((await new db(schemas.main.coreMainModel(true)).readRecords(undefined, "devs"))[0].devs).split(`,`);
            
            if (_devIDs.indexOf(this._user.id) > -1) return true;
            return false; 
        }

        /**
         * Returns true if a user has an admin role.
         * @param table
         * @param user 
         */
        isAdmin = async () => {
            let _adminIDs = String((await new db(schemas.main.coreMainModel(true)).readRecords(undefined, 'admins'))[0].admins).split(`,`);

            if (_adminIDs.indexOf(this._user.id) > -1) return true;
            return false;
        }

        /**
         * Returns true if user has a mod role.
         * @param table
         * @param user 
         */
        isMod = async () => {
            let _modIDs = String((await new db(schemas.main.coreMainModel(true)).readRecords(undefined, 'mods'))[0].mods).split(`,`);

            if (_modIDs.indexOf(this._user.id) > -1) return true;
            return false;
        }

        /**
         * Returns true if user is Dev/SuperAdmin/Admin/Mod
         * @param table
         * @param user 
         */
        isEmpowered = async () => {
            if (await this.isDev() || await this.isAdmin() || await this.isMod()) return true;
            return false;
        }
    }
}

export namespace guild {
    export class auth {
        private _guild: Guild;
        private _user: User;

        constructor(guild: Guild, user: User) {
            this._guild = guild;
            this._user = user;
        }

        /**
         * Returns true if a players ID matches that of the developer's IDs.
         * @param table
         * @param user 
         */
        isDev = async () => {
            let _devIDs = String((await new db(schemas.main.coreMainModel(true)).readRecords(undefined, `devs`))[0].devs).split(`,`);

            if (await _devIDs.indexOf(this._user.id) > -1) return true;
            else return false; 
        }

        /**
         * Returns true if a user is the Guild Owner
         * @param guild
         * @param user
         */
        isGuildOwner = () => {
            let ret = false;
            
            if (this._guild.ownerId == this._user.id) { ret = true; };
            return ret;
        }

        /**
         * Returns true if a user has a local owner role.
         * @param table
         * @param user 
         */
        isOwner = async () => {
            let _ownerRoles = String((await new db(schemas.guild.coreGuildModel(this._guild, true)).readRecords(undefined, `ownerroles`))[0].ownerroles).split(`,`);
            let _owners = String((await new db(schemas.guild.coreGuildModel(this._guild, true)).readRecords(undefined, `owners`))[0].owners).split(`,`);

            // check if player's ID is in the list
            let ret = false;

            this._guild.members.cache.find((member) => { return member.user == this._user })?.roles.cache.forEach(r => { if (_ownerRoles.includes(r.id)) ret = true; });
            if (_owners.includes(this._user.id)) { ret = true; };
            return ret;
        }

        /**
         * Returns true if a user has a local admin role.
         * @param table
         * @param user 
         */
        isAdmin = async () => {
            let _adminRoles = String((await new db(schemas.guild.coreGuildModel(this._guild, true)).readRecords(undefined, `adminroles`))[0].adminroles).split(`,`);
            let _admins = String((await new db(schemas.guild.coreGuildModel(this._guild, true)).readRecords(undefined, `admins`))[0].admins).split(`,`);

            // check if player's ID is in the list
            let ret = false;

            this._guild.members.cache.find((member) => { return member.user == this._user })?.roles.cache.forEach(r => { if (_adminRoles.includes(r.id)) ret = true; });
            if (_admins.includes(this._user.id)) { ret = true; };
            return ret;
        }

        /**
         * Returns true if user has a local mod role.
         * @param table
         * @param user 
         */
        isMod = async () => {
            let _modRoles = String((await new db(schemas.guild.coreGuildModel(this._guild, true)).readRecords(undefined, `modroles`))[0].modroles).split(`,`);
            let _mods = String((await new db(schemas.guild.coreGuildModel(this._guild, true)).readRecords(undefined, `mods`))[0].mods).split(`,`);

            let ret = false;

            this._guild.members.cache.find((member) => { return member.user == this._user })?.roles.cache.forEach(r => { if (_modRoles.includes(r.id)) ret = true; });
            if (_mods.includes(this._user.id)) { ret = true; };
            return ret;
        }

        /**
         * Returns true if user is Dev/SuperAdmin/Admin/Mod
         * @param table
         * @param user 
         */
        isEmpowered = async () => {
            if (await this.isGuildOwner() || await this.isDev() || await this.isOwner() || await this.isAdmin() || await this.isMod()) return true;
            else return false;
        }

        /**
         * Returns true if user is Opted In.
         * @param table
         * @param user 
         */
        isProtectee = async () => {
            let _protecteeRoles = String(await new db(schemas.guild.coreGuildModel(this._guild, true)).readRecords(undefined, `protecteeroles`)).split(`,`);

            let ret = false;

            this._guild.members.cache.find((member) => { return member.user == this._user })?.roles.cache.forEach(r => { if (_protecteeRoles.includes(r.id)) ret = true; });
            return ret;
        }

        /**
         * Returns true if a user is locally Request Blacklisted.
         * @param table
         * @param user 
         * @param guild 
         */
        isRequestBlacklisted = async () => {
            let _requestBlacklistUsers = String(await new db(schemas.guild.coreGuildModel(this._guild, true)).readRecords(undefined, `requestBlacklisted`)).split(`,`);

            if (await _requestBlacklistUsers.indexOf(this._user.id) > -1) return true;
            else return false;
        }

        /**
         * Returns true if a user ID is blacklisted.
         * @param table
         * @param user 
         */
        isBlacklisted = async () => {
            // Check if player's ID is revoked in the list
            let ret = false;

            if (String(await new db(schemas.guild.coreGuildModel(this._guild, true)).readRecords(undefined, 'usersblacklisted')).includes(this._user.id)) { ret = true; };
            return ret;
        }

        /**
         * Returns true if a user has a blacklisted role.
         * @param table
         * @param user 
         */
        isAnnounceBlacklisted = async () => {
            let _blacklistedAnnounceRoles = String(await new db(schemas.guild.coreGuildModel(this._guild, true)).readRecords(undefined, `roleannounceblacklist`)).split(`,`);

            // Check if player's ID is revoked in the list
            let ret = false;

            this._guild.members.cache.find((member) => { return member.user == this._user })?.roles.cache.forEach(r => { if (_blacklistedAnnounceRoles.includes(r.id)) ret = true; });
            return ret;
        }

        /**
         * Returns true if a user has revoked permissions.
         * @param table
         * @param user 
         */
        isPermissionRevoked = async () => {
            let _revokedUsers = String(await new db(schemas.guild.coreGuildModel(this._guild, true)).readRecords(undefined, `usersblacklisted`)).split(`,`);

            // Check if player's ID is revoked in the list
            if (_revokedUsers.indexOf(this._user.id) > -1) return true; 
            else return false;
        }

        /**
         * Returns true if a user has a local role.
         * @param discord 
         * @param user 
         * @param role 
         */
        hasRole = (_role: Role) => {
            let ret = false;

            this._guild.members.cache.find((member) => { return member.user == this._user })?.roles.cache.forEach(r => { if (r.id === (_role as Role).id) ret = true; })

            return ret;
        }
    }
}