/**
 * Created 23.01.2020.
 */

public with sharing class SalesData {

    @RemoteAction
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getRecords() {
        
        // fetching the Records via SOQL
        List<Division_Manager__c> Records = new List<Division_Manager__c>();
        Records = [SELECT Id, Name, Color__c, Avatar__c, Country__c, Status__c, Tags__c, Stats_Data__c FROM Division_Manager__c];

        Map<String, Object> result = new Map<String, Object>{
            'records' => Records
        };
        return result;
   }
}