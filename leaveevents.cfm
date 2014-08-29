<cfsilent>
	<cfsetting showdebugoutput="false" />
	<cfif StructKeyExists(url, "mmyy")>
		<cfset jsdate = DateAdd("s", url.mmyy, CreateDate(1970,1,1)) />
		<cfset variables.start = createdate(datepart("yyyy",jsdate), datepart("m", jsdate), 1) />
		<cfset variables.end = createdate(datepart("yyyy",jsdate), datepart("m", jsdate), daysinmonth(jsdate)) />
		<cfquery name="qLeave" datasource="MSSQLHSW">
			select staffid, startdate, enddate, leavetype
			from tblhswleaverequest lr
			where startdate >= <cfqueryparam cfsqltype="cf_sql_date" value="#start#" />
			and enddate <= <cfqueryparam cfsqltype="cf_sql_date" value="#end#" />
		</cfquery>
	</cfif>
 </cfsilent>
<cfif isdefined("qLeave") And qLeave.recordcount Gt 0>
<cfcontent reset="true" type="application/json">
[<cfoutput query="qLeave">
{"id": "#staffid#","start": "#dateformat(startdate,'yyyymmdd')#","end": "#dateformat(enddate,'yyyymmdd')#","type":"#leavetype#","backimage":"","notes":""}<cfif currentrow Neq recordcount>,</cfif>
</cfoutput>]
</cfif>
<cfabort>