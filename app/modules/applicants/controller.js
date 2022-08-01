
module.exports = {
    create: async function(params){
        let validation = this.validator(params);
        if(!validation.status){
            return {
                status: false,
                message: 'Invalid Request!',
                errors: validation.errors,
            }
        }
        await global.db_helper.requestWithData("insert into applicant (first_name, last_name, email) values (?,?,?)",[params.first_name, params.last_name, params.email]);
        return {
            status: true,
            message: 'Success',
        }
    },

    read: async function(params){
        let result = await global.db_helper.requestWithData("select * from applicant where id = ?",[params.id])
        if(result && result[0]){
            return result[0];
        }
        return {};
    },

    update: async function(params){
        let validation = this.validator(params);
        if(!validation.status){
            return {
                status: false,
                message: 'Invalid Request!',
                errors: validation.errors,
            }
        }
        params.id = params.id || '';
        await global.db_helper.requestWithData("update applicant set first_name = ?, last_name = ?, email = ? where id = ?",[params.first_name, params.last_name, params.email, params.id]);
        return {
            status: true,
            message: 'Success',
        }
    },

    delete: async function(params){
        let result = await global.db_helper.requestWithData("delete from applicant where id = ?",[params.id]);
        console.log(result[0])
        if(!result.affectedRows){
            return {
                status: false,
                message: 'Invalid Request!',
            }
        }
        return {
            status: true,
            message: 'Success',
        }
    },

    validator: function(params){

        let errors = [];

        if(!params.first_name) errors.push({field:'first_name', message: 'Invalid First Name!' })
        if(!params.last_name) errors.push({field:'last_name', message: 'Invalid Last Name!' })
        if(!params.email) errors.push({field:'email', message: 'Invalid Email Address!' })
        if(errors.length){
            return {
                status: false, 
                errors: errors,
            };
        }
        return {status: true};
    }
}