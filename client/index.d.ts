/**
 * @author Copyright RIKSOF (Private) Limited 2017.
 *
 * @file JIT Client modules.
 */
export class JitACL {
  /**
   * Constructor
   *
   * @constructor
   *
   * @class [JitACL Object]
   */
  constructor();

  /**
   * Validates if user has access to the given object.
   *
   * @param {string} owner                    Owner of the object. Always has full access by default.
   * @param {Object} users                    Users who are allowed access.
   * @param {Object} groups                   Groups that are allowed access to this object.
   * @param {string} requester                User requesting access.
   * @param {Array.string} requesterGroups    Groups requester is part of.
   * @param {string} access                   Required access, either read or write.
   *
   * @returns {Boolean} allowed               True if allowed, false otherwise.
   */
  checkAccess(owner: string, users: any, groups: any, requester: string, requesterGroups: any, access: string): boolean;

  /**
   * Add / Update given user's access to the object.
   *
   * @param {Object} users          Users list for object.
   * @param {string} user           User to be granted access.
   * @param {boolean} read          Allow read access?
   * @param {boolean} write         Allow write access?
   *
   * @returns {Object} users        Updated users list.
   */
  assignUserToObject(users: any, user: string, read: boolean, write: boolean): any;

  /**
   * Add / Update given group's access to the object.
   *
   * @param {Object} groups         Groups list for object.
   * @param {string} group          Group to be granted access.
   * @param {boolean} read          Allow read access?
   * @param {boolean} write         Allow write access?
   *
   * @returns {Object} groups       Updated groups list.
   */
  assignGroupToObject(groups: any, group: string, read: boolean, write: boolean): any;

  /**
   * Add given user to the given group.
   *
   * @param {string} user           User to be added.
   * @param {Object} userGroups     List of user groups.
   * @param {string} group          Name of group.
   *
   * @returns {Object} userGroups   Updated user groups.
   */
  addUserToGroup(user: string, userGroups: any, group: string): any;

  static READ_ACCESS: string;
  static WRITE_ACCESS: string;
}

export class JitBranches {

  /**
   * Constructor
   *
   * @constructor
   *
   * @param {String} user             User id.
   * @param {lokijs} db               Reference to the db.
   *
   * @class [Branches Object]
   */
  constructor(user: string, db: any);

  /**
   * Checkout a given branch if it exists.
   *
   * @param {string} name               Name of branch.
   *
   * @returns {Object} current          Current branch.
   */
  checkout(name: string): any;

  /**
   * Checkout a given search branch if it exists.
   *
   * @param {string} name               Name of branch.
   *
   * @returns {Object} current          Current branch.
   */
  searchBranch(name: string): Promise<any>;

  /**
   * Add a new branch to the respository.
   *
   * @param {string} name               Name of branch.
   *
   * @returns {Object} branch           Reference to the newly added branch.
   */
  add(name: string): Promise<any>;

  /**
   * Delete a branch from the respository.
   *
   * @param {string} name               Name of branch.
   *
   * @returns {boolean} status          True if deleted, false otherwise.
   */
  delete(name: string): Promise<boolean>;

  /**
   * List branches in the respository.
   *
   * @returns {Array.BranchesConstructor.Branch} branches     Name of branches.
   */
  list(): Promise<any>;
}

export class JitClient {
  /**
   * Constructor
   *
   * @constructor
   *
   * @param {string} url                  URL of server.
   * @param {string} clientId             Client Id.
   * @param {string} clientSecret         Client secret.
   *
   * @class [JitClient Object]
   */
  constructor(url: string, clientId: string, clientSecret: string);

  /**
   * Connects to user using just the client credentials. If username and
   * passsword are given, then uses those credentials.
   *
   * @param {string} username                 (Optional) Username
   * @param {string} password                 (Optional) Password
   *
   * @returns {Promise} p                     Promise with result of connection request.
   */
  connect(username?: string, password?: string): any;

  /**
   * Connects using a previously negotiated token.
   *
   * @param {string} username                 Username or client Id.
   * @param {string} token                    Token
   * @param {string} refreshToken             Refresh token.
   * @param {boolean} refresh                 Refresh boolean.
   *
   * @returns {Boolean} result                True if token successfully created.
   */
  reconnect( username: string, accessToken: string, refreshToken: string, refresh?: boolean ): any;

  /**
   * Pull commits from remote branch.
   *
   * @param {string} remoteOwner              Owner of the remote branch.
   * @param {string} remoteBranch             Name of the remote branch.
   * @param {string} remoteObjectId           ID for the remote object.
   * @param {sring} referenece                (Unused) Reference for this pull request.
   * @param {string} start                    (Optional) Filter commits after this ID.
   * @param {string} end                      (Optional) Filter commits up to this ID.
   *
   * @returns {Promise} p                     Promise with result of pulls.
   */
  pull(remoteOwner: string, remoteBranch: string, remoteObjectId: string,
    reference?: string, start?: string, end?: string): any;

  /**
   * Push commits from local branch to remote branch.
   *
   * @param {string} localBranch              Name of the local branch.
   * @param {string} remoteOwner              Owner of the remote branch.
   * @param {string} remoteBranch             Name of the remote branch.
   * @param {string} remoteObjectId           ID for the remote object.
   * @param {Array.commits} commits           Commits to be pushed.
   * @param {string} head                     Head to which we are pushing.
   *                                          Undefined if its a new object.
   *
   * @returns {Promise} p                     Promise with result of push request.
   */
  push(localBranch: string, remoteOwner: string, remoteBranch: string, remoteObjectId: string, commits: any, head?: string): any;

  /**
   * Search for objects on the remote branch.
   *
   * @param {string} remoteOwner              Owner of the remote branch.
   * @param {string} remoteBranch             Name of the remote branch.
   * @param {string} ref                      Reference to the search.
   * @param {Object} query                    MongoDb like query.
   * @param {Object} refreshTime              Refresh time in seconds.
   * @param {Object} projections              (Optional) MongoDb like projections.
   * @param {Object} sort                     (Optional) Fields to sort on.
   * @param {Number} offset                   (Optional) Return documents from this
   *                                          position in the resultset.
   * @param {Number} limit                    (Optional) Return these many documents.
   * @param {string} start                    (Optional) Filter commits after this ID.
   * @param {string} end                      (Optional) Filter commits up to this ID.
   * @param {any[]} listeners                 (Optional) Listeners for this resultset.
   *
   * @returns {Promise} p                     Promise with result of push request.
   */
  search(remoteOwner: string, remoteBranch: string, ref: string, query: any,
    refreshTime: any, projections?: any, sort?: any, offset?: number,
    limit?: number, start?: string, end?: string, listeners?: any[] ): any;

  /**
   * Create a new remote branch.
   *
   * @param {string} branch                   Name of the branch.
   * @param {any} users                       Users to be given access to this branch.
   * @param {any} groups                      Groups to be given access to this branch.
   * @param {any} listeners                   Listeners for the branch.
   *
   * @returns {Promise} p                     Promise with result of branching request.
   */
  createBranch(branch: string, users?: any, groups?: any, listeners?: any): any;

  /**
   * Chunk for file
   *
   * @param {string} fileId                   ID of file being uploaded.
   * @param {number} chunkNumber              Chunk number.
   * @param {string} chunk                    Chunk buffer.
   * @param {string} branch                   File system branch.
   * @param {string} remoteOwner              Owner of the remote branch.
   *
   * @returns {Promise} p                     Promise with result of branching request.
   */
  chunkForFile(fileId: string, chunkNumber: number, chunk: string, branch: string,
    remoteOwner:string ): any;

  /**
   * Merge chunks for file
   *
   * @param {string} fileId                   ID of file being uploaded.
   * @param {string} branch                   File system branch.
   * @param {string} remoteOwner              Owner of the remote branch.
   *
   * @returns {undefined} None
   */
  mergeChunksForFile(fileId: string, branch: string, remoteOwner: string ): void;

  /**
   * Handle the error.
   *
   * @param {Object} res                      Response received.
   *
   * @returns {Promise} p                     Rejected promise.
   */
  handleError(res: any): void;

  // Connection details.
  connection: any;
  clientId: string;

  static API_ENDPOINT: string;
  static OAUTH_ENDPOINT: string;
}

export class JitCommits {
  /**
   * Constructor
   *
   * @constructor
   *
   * @param {Array.CommitsConstructor.Commit} commits     Commits for the objects.
   *
   * @class [Commits Object]
   */
  constructor(commits?: any);

  /**
   * Add a commit.
   *
   * @param {Diff} diff               The diff for this
   * @param {string} logMessage       Log message.
   * @param {Date} dateAndTime        Date and time of the commit.
   * @param {string} userId           Internal user ID
   * @param {string} computedHash     Computation of the hash.
   * @param {string} commitId         Optional commit id.
   *
   * @returns {undefined} None
   */
  addCommit( diff: JitDiff, logMessage: string, dateAndTime: Date, userId: string,
    computedHash: string, commitId?: string );

  /**
   * Get all commits.
   *
   * @returns {Array.CommitsConstructor} commits
   */
  getAllCommits(): any[];

  /**
   * Get filtered commits between two IDs.
   *
   * @param {string} startingId             Null if you want to start from the beginning.
   * @param {string} endingId               Null if you want to get all commits a after starting ID.
   *
   * @returns {Array.CommitsConstructor} commits
   */
  getFilteredCommits(startingId?: string, endingId?: string): any[];
}

export class JitDiff {

  /**
   * Constructor
   *
   * @constructor
   *
   * @param {Document} base             Base document.
   * @param {Document} current          Current document.
   *
   * @class [Diff Document]
   */
  constructor(base: any, current: any);

  /**
   * Check if there are changes in this diff.
   *
   * @returns {Boolean} status          True if there are changes, false otherwise.
   */
  didChange() : boolean;
}

export namespace JitDocument {

  /**
   * Init the Document.
   *
   * @param {Document} doc              Document.
   *
   * @returns {Document} doc            Updated document.
   */
  function init( doc: any): void;

  /**
   * If the document is initialized.
   *
   * @param {Document} doc              Document.
   *
   * @returns {Boolean} init            Whether the document is initialized.
   */
  function isInitialized( doc: any ): boolean;

  /**
   * Get document ID.
   *
   * @param {Document} doc              Document.
   *
   * @returns {string} id               ID of the document
   */
  function getId(doc: any): string;

  /**
   * Set document ID.
   *
   * @param {Document} doc              Document.
   * @param {string} id                 ID of the document
   *
   * @returns {undefined} None
   */
  function setId(doc: any, id: string): void;

  /**
   * Get commit logs.
   *
   * @param {Document} doc              Document.
   *
   * @returns {Array.Commit} commits    Commits on this document.
   */
  function getCommits(doc: any): any;

  /**
   * Get pulls.
   *
   * @param {Document} doc              Document.
   *
   * @returns {JitPulls} pulls          Pulls on this document.
   */
  function getPulls(doc: any): JitPulls;

  /**
   * Get users who have access to this object.
   *
   * @param {Document} doc              Document.
   *
   * @returns {Array.Object} users      Users with access to this document.
   */
  function getUsers(doc: any): any;

  /**
   * Get groups that have access to this object.
   *
   * @param {Document} doc              Document.
   *
   * @returns {Array.string} groups     Groups with access to this object.
   */
  function getGroups(doc: any): any;
}

export namespace JitFileHash {

  /**
   * Hash a given string.
   *
   * @param {string} buff                         Buffer to be hashed.
   *
   * @returns {string} hash                       Current hash.
   */
  function hash( buff: string ): string;
}

export interface JitQueueInterface {
  /**
   * Send message to given queue.
   *
   * @param {string} queueUrl           Queue URL.
   * @param {Object | Array.Object}     messages.
   * @param {number} delaySeconds       The time, in seconds, for which to delay a
   *                                    specific message. Valid values: 0 to 900.
   * @param {string} messageGroupId     The tag that specifies that a message
   *                                    belongs to a specific message group.
   *
   * @returns {Promise} p               Promise once message is sent.
   */
  sendMessage(
    queueUrl: string, messages: any, delaySeconds?: number, messageGroupId?: string
  ): any;

  /**
   * Receive message from given queue.
   *
   * @param {string} queueUrl             Queue URL.
   * @param {number} waitTime             Wait time.
   * @param {number} maxNumberOfMessages  Maximum number of messages to get in a
   *                                      single request.
   * @param {string} attribute            Attribute that needs to be returned with
   *                                      each message.
   *
   * @returns {Promise} p                 Array of received messsages.
   */
  receiveMessage(
    queueUrl: string, waitTime?: number, maxNumberOfMessages?: number, attribute?: string
  ): any;
}

export class JitLocalQueue implements JitQueueInterface {
  /**
   * Constructor
   *
   * @param {string} url                        URL for the local queue manager.
   *
   * @constructor
   *
   * @class [JitLocalQueue Object]
   */
  constructor( url: string );

  /**
   * Send message to given queue.
   *
   * @param {string} queueUrl           Queue URL.
   * @param {Object | Array.Object}     messages.
   * @param {number} delaySeconds       The time, in seconds, for which to delay a
   *                                    specific message. Valid values: 0 to 900.
   * @param {string} messageGroupId     The tag that specifies that a message
   *                                    belongs to a specific message group.
   *
   * @returns {Promise} p               Promise once message is sent.
   */
  sendMessage(
    queueUrl: string, messages: any, delaySeconds?: number, messageGroupId?: string
  ): any;

  /**
   * Receive message from given queue.
   *
   * @param {string} queueUrl             Queue URL.
   * @param {number} waitTime             Wait time.
   * @param {number} maxNumberOfMessages  Maximum number of messages to get in a
   *                                      single request.
   * @param {string} attribute            Attribute that needs to be returned with
   *                                      each message.
   *
   * @returns {Promise} p                 Array of received messsages.
   */
  receiveMessage(
    queueUrl: string, waitTime?: number, maxNumberOfMessages?: number, attribute?: string
  ): any;
}

export class JitLokiDb {
  /**
   * Constructor
   *
   * @param {string} dbname                     Name of db.
   * @param {any} options                       Configuration options for db.
   *
   * @constructor
   *
   * @class [LokiDb Object]
   */
  constructor( dbname: string, options: any );

  /**
   * Create LokiDb Connection.
   *
   * @returns {Promise}           Promise with database instance
   */
  connect(): any;
}

/**
 * Map reduce functions using mathjs
 */
export class JitMapReduceMath {}

export namespace JitMathLib {

  /**
   * Extends the math library with functions that improve reporting.
   *
   * @param {mathjs} m                        Reference to the math library.
   *
   * @returns {undefined} None.
   */
  function extend( doc: any ): boolean;
}

export namespace JitMerge {
  /**
   * Merge the diffs into base document.
   *
   * @param {Document} base             Base document.
   * @param {Array.Diff} diffs          Array of diffs.
   *
   * @returns {Document} base           New merged document.
   */
  function merge(base: any, diffs: JitDiff[]): any;
}

export class JitNotifications {
  /**
   * Constructor
   *
   * @constructor
   *
   * @class [Notifications Object]
   */
  constructor();

  /**
   * Register for being notified when there is a commit on given object Id.
   *
   * @param {string} objId                  Object Id.
   *
   * @returns {Promise} p                   Promise to be notified.
   */
  register( objId: string ): any;

  /**
   * The subscriber invokes this api to let us know he unsubscribed.
   *
   * @param {string} objId                  Object Id to be unsubscribed.
   *
   * @returns {undefined} None.
   */
  deregister( objId: string ): void;
}

export class JitPullRequests {
  /**
   * Constructor
   *
   * @constructor
   *
   * @param {JitRepository} repo          Repository to keep track of pull
   *                                      requests.
   * @param {Object} branch               Branch where the requests are saved.
   *
   * @class [PullRequests Object]
   */
  constructor( repo: any, br: any);

  /**
   * Add a new pull request.
   *
   * @param {string} localBranch              Name of the local branch.
   * @param {string} remoteOwner              Owner of the remote branch.
   * @param {string} remoteBranch             Name of the remote branch.
   * @param {string} remoteObjectId           ID for the remote object.
   * @param {string} reference                Reference reviewer uses to review.
   * @param {Array.commits} commits           Commits to be pushed.
   * @param {string} head                     (Optional)Head to which we are pushing.
   *                                          Undefined if its a new object.
   *
   * @returns {Promise} p                     Promise for saved pull request.
   */
  add( localBranch: string, remoteOwner: string, remoteBranch: string,
    remoteObjectId: string, reference: string, commits: any[], head?: string );
}

/**
 * Entry for a single pull request.
 */
export interface JitPullRequestsEntry {
  localBranch: string;
  remoteOwner: string;
  remoteBranch: string;
  remoteObjectId: string;
  reference: string;
  commits: any[];
  head: string;
  status: number;
}

export class JitPulls {

  /**
   * Constructor
   *
   * @constructor
   *
   * @param {PullsConstructor.Pull} pulls         Pulls for the objects.
   *
   * @class [Pulls Object]
   */
  constructor(pulls: any);

  /**
   * Updates information on a pull from a remote branch.
   *
   * @param {string} path             Path to the branch.
   * @param {string} commitId         Commit ID for the branch.
   *
   * @returns {undefined} None
   */
  updatePull(path: string, commitId: string): void;

  /**
   * Updates information on a pull from a remote branch.
   *
   * @param {string} path             Path to the branch.
   * @param {string} commitId         Commit ID for the branch.
   *
   * @returns {undefined} None
   */
  updatePush(path: string, commitId: string): void;

  /**
   * Get information on a pull from a remote branch.
   *
   * @param {string} path             Path to the branch.
   *
   * @returns {undefined} None
   */
  getPullInformation(path: string): any;

  /**
   * Get information on a pull from a remote branch.
   *
   * @param {string} path             Path to the branch.
   *
   * @returns {undefined} None
   */
  getPushInformation(path: string): any;
}

export class JitRepository {

  /**
   * Constructor
   *
   * @constructor
   *
   * @param {string} user                 Repository for user.
   * @param {lokijs} db                   DB
   * @param {JitNotifications} notifier   Notifications for changes.
   * @param {JitMapReduce} MapReduce      MapReduce class.
   *
   * @class [JitRepository Object]
   */
  constructor(user: string, db: any, notifications: JitNotifications, MapReduce: any );

  /**
   * Setup the repository.
   *
   * @returns {Promise} p               Promise to indicate when the setup completed.
   */
  setup(): any;

  /**
   * Get object with given jsonit id.
   *
   * @param {Object} branch                   Branch the object is on.
   * @param {string} objId                    ID of the object.
   *
   * @returns {Document} doc                  Promise for a document.
   */
  get(branch: any, objId: string): any;

  /**
   * Search for objects with given query and projections.
   *
   * @param {Object} branch                   Branch to search
   * @param {Object} query                    MongoDb like query.
   * @param {Object} projections              MongoDb like projections.
   * @param {Object} sort                     Fields to sort on.
   * @param {Number} start                    Return documents from this position
   *                                          in the resultset.
   * @param {Number} limit                    Return these many documents.
   *
   * @returns {Array.Document} doc            Promise for an array of documents.
   */
  search(branch: any, query: any, projections?: any, sort?: any, start?: number,
    limit?: number): any;

  /**
   * Commit an object back to its branch.
   *
   * @param {Object} branch               Reference to the branch.
   * @param {Document} obj                Object to be comitted.
   * @param {string} logMessage           Log message for commit.
   * @param {string} commitId             Optional commit ID.
   *
   * @returns {Document} doc              Promise for a document.
   */
  commit(branch: any, obj: any, logMessage: string, commitId?: string): any;

  /**
   * This is for merging two branches. The other branch can be a remote
   * branch or another local branch.
   *
   * @param {Object} branch                 Reference to the branch which needs to get the commits.
   * @param {string} objId                  $jsonit.id of object to be merged to.
   * @param {Array.Commits.Commit} commits  All commits done on the remote branch.
   * @param {string} prefix                 Message prefix.
   * @param {string} head                   (Optional) The head on which we merge commits.
   * @param {string} remoteBranch           (Optional) To remember the head
   *                                        we pulled from remote branch.
   *
   * @returns {Document} obj                Updated object.
   */
  mergeToBranch(branch: any, objId: string, commits: any[], prefix: string, head?: string, remoteBranch?: string): any;

  /**
   * After we have merged to remote branch. This method is called to confirm
   * and update local information about the remote head.
   *
   * @param {Object} branch                 Reference to the branch which needs to get the commits.
   * @param {string} objId                  $jsonit.id of object to be merged to.
   * @param {Array.Commits.Commit} commits  All commits done on the remote branch.
   * @param {string} remoteBranch           Remote branch to update.
   *
   * @returns {Document} obj                Updated object.
   */
  confirmMergeToBranch(branch: any, objId: string, commits: any, remoteBranch: string): any;

  /**
   * Computes commits required for merging the two branches.
   *
   * @param {Object} branch                 Reference to the branch which needs to get the commits.
   * @param {string} objId                  $jsonit.$meta.id of object to be merged to.
   * @param {Array.Commits.Commit} commits  All commits done on the other branch.
   *
   * @returns {RepositoryConstructor.MergeReport} report    Updated report.
   */
  getMergeReport(branch: any, objId: string, commits: any): any;

  branches: JitBranches;
}

export class JitSearch {
  /**
   * Constructor
   *
   * @constructor
   *
   * @param {any} repo                  The repo we keep our data.
   * @param {any} searchBranch          The branch we keep search result.
   * @param {any} dataBranch            The branch we keep our data.
   *
   * @class [JitSearch Object]
   */
  constructor(repo: any, searchBranch: any, dataBranch: any);

  /**
   * Start a search based on given paramters.
   *
   * @param {string} ref                      Reference to search.
   * @param {any} query                       MongoDb like query.
   * @param {number} refreshTime              Refresh time in seconds.
   * @param {any} projections                 (Optional) MongoDb like projections.
   * @param {any} sort                        (Optional) Fields to sort on.
   * @param {number} start                    (Optional) Return documents from this
   *                                          position in the resultset.
   * @param {number} limit                    (Optional) Return these many documents.
   *
   * @returns {any} entry                     Search entry results promise.
   */
  getSearchEntry( ref: string, query: any, refreshTime: number, projections?: any, sort?: any,
    start?: number, limit?: number ): any;

  /**
   * Merge data from two search results.
   *
   * @param {Array.Object} base                 Data from the base search.
   * @param {Array.Object} draft                Data from draft search.
   *
   * @returns {Array.Object} results          Merged results.
   */
  static mergeSearchResults( base: any[], draft: any[] ): any[];

  /**
   * Merge data from search results for Ids.
   *
   * @param {Array.Object} base                 Data from the base search.
   * @param {Array.Object} draft                Data from draft search.
   * @param {Array.String} idKeys               Keys to use for ids.
   *
   * @returns {Array.Object} results            Merged results.
   */
  static mergeSearchResultsForIds( base: any[], draft: any[], idKeys: string[] ): any[];
}

export class JitSocketClient {
  /**
   * Constructor
   *
   * @constructor
   *
   * @param {string} url                  URL of server.
   *
   * @class [JitSocketClient Object]
   */
  constructor(url: string);

  /**
   * Connects to the given socket with given token for authentications.
   *
   * @param {string} owner                Owner of the account.
   * @param {string} token                OAuth Token.
   *
   * @returns {Promise} p
   */
  connect( owner: string, token: string ): any;

  /**
   * Disconnects
   *
   * @returns {Promise} p                Promise for disconnection.
   */
  disconnect(): any;

  /**
   * Returns a promise for when we get connected.
   *
   * @returns {Promise} p
   */
  promiseForConnection(): any;

  /**
   * Returns a promise for when we get disconnected.
   *
   * @returns {Promise} p
   */
  promiseForDisconnection(): any;

  /**
   * Pull commits from remote branch.
   *
   * @param {string} remoteOwner              Owner of the remote branch.
   * @param {string} remoteBranch             Name of the remote branch.
   * @param {string} remoteObjectId           ID for the remote object.
   * @param {sring} referenece                (Unused) Reference for this pull request.
   * @param {string} start                    (Optional) Filter commits after this ID.
   * @param {string} end                      (Optional) Filter commits up to this ID.
   *
   * @returns {Promise} p                     Promise with result of pulls.
   */
  pull(remoteOwner: string, remoteBranch: string, remoteObjectId: string,
    reference?: string, start?: string, end?: string): any;

  /**
   * Push commits from local branch to remote branch.
   *
   * @param {string} localBranch              Name of the local branch.
   * @param {string} remoteOwner              Owner of the remote branch.
   * @param {string} remoteBranch             Name of the remote branch.
   * @param {string} remoteObjectId           ID for the remote object.
   * @param {Array.commits} commits           Commits to be pushed.
   * @param {string} head                     Head to which we are pushing.
   *                                          Undefined if its a new object.
   *
   * @returns {Promise} p                     Promise with result of push request.
   */
  push(localBranch: string, remoteOwner: string, remoteBranch: string, remoteObjectId: string, commits: any, head?: string): any;

  /**
   * Search for objects on the remote branch.
   *
   * @param {string} remoteOwner              Owner of the remote branch.
   * @param {string} remoteBranch             Name of the remote branch.
   * @param {string} ref                      Reference to the search.
   * @param {Object} query                    MongoDb like query.
   * @param {Object} refreshTime              Refresh time in seconds.
   * @param {Object} projections              (Optional) MongoDb like projections.
   * @param {Object} sort                     (Optional) Fields to sort on.
   * @param {Number} offset                   (Optional) Return documents from this
   *                                          position in the resultset.
   * @param {Number} limit                    (Optional) Return these many documents.
   * @param {string} start                    (Optional) Filter commits after this ID.
   * @param {string} end                      (Optional) Filter commits up to this ID.
   * @param {any[]} listeners                 (Optional) Listeners for this resultset.
   *
   * @returns {Promise} p                     Promise with result of push request.
   */
  search(remoteOwner: string, remoteBranch: string, ref: string, query: any,
    refreshTime: any, projections?: any, sort?: any, offset?: number,
    limit?: number, start?: string, end?: string, listeners?: any[] ): any;

  /**
   * Create a new remote branch.
   *
   * @param {string} branch                   Name of the branch.
   * @param {any} users                       Users to be given access to this branch.
   * @param {any} groups                      Groups to be given access to this branch.
   * @param {any} listeners                   Listeners for the branch.
   *
   * @returns {Promise} p                     Promise with result of branching request.
   */
  createBranch(branch: string, users?: any, groups?: any, listeners?: any): any;

  /**
   * Chunk for file
   *
   * @param {string} fileId                   ID of file being uploaded.
   * @param {number} chunkNumber              Chunk number.
   * @param {string} chunk                    Chunk buffer.
   * @param {string} branch                   File system branch.
   * @param {string} remoteOwner              Owner of the remote branch.
   *
   * @returns {Promise} p                     Promise with result of branching request.
   */
  chunkForFile(fileId: string, chunkNumber: number, chunk: string,
    branch: string, remoteOwner:string ): any;

  /**
   * Merge chunks for file
   *
   * @param {string} fileId                   ID of file being uploaded.
   * @param {string} branch                   File system branch.
   * @param {string} remoteOwner              Owner of the remote branch.
   *
   * @returns {undefined} None
   */
  mergeChunksForFile(fileId: string, branch: string, remoteOwner:string ): void;

  connection: any;

  static STATE_CONNECTED: number;
  static STATE_DISCONNECTED: number;
}

export class JitSQS implements JitQueueInterface {
  /**
   * Constructor
   *
   * @param {any} credentials                       Credentials to connect to SQS.
   *
   * @constructor
   *
   * @class [JitSQS Object]
   */
  constructor( credentials: any );

  /**
   * Send message to given queue.
   *
   * @param {string} queueUrl           Queue URL.
   * @param {Object | Array.Object}     messages.
   * @param {number} delaySeconds       The time, in seconds, for which to delay a
   *                                    specific message. Valid values: 0 to 900.
   * @param {string} messageGroupId     The tag that specifies that a message
   *                                    belongs to a specific message group.
   *
   * @returns {Promise} p               Promise once message is sent.
   */
  sendMessage(
    queueUrl: string, messages: any, delaySeconds?: number, messageGroupId?: string
  ): any;

  /**
   * Receive message from given queue.
   *
   * @param {string} queueUrl             Queue URL.
   * @param {number} waitTime             Wait time.
   * @param {number} maxNumberOfMessages  Maximum number of messages to get in a
   *                                      single request.
   * @param {string} attribute            Attribute that needs to be returned with
   *                                      each message.
   *
   * @returns {Promise} p                 Array of received messsages.
   */
  receiveMessage(
    queueUrl: string, waitTime?: number, maxNumberOfMessages?: number, attribute?: string
  ): any;
}

export class JitSync {

  /**
   * Constructor
   *
   * @constructor
   *
   * @param {SocketClient} client         Connected client.
   * @param {Repository} repo             Repository to keep track of pending
   *                                      requests.
   * @param {Object} branch               Branch where the requests are saved.
   * @param {string} name                 Name of the list.
   * @param {function} callback           Callback has three arguments:
   *                                      1. Error (null if there was none).
   *                                      2. Response from server.
   *                                      3. Entry that was processed.
   *
   * @class [JitSync Object]
   */
  constructor( client: JitSocketClient, repo: JitRepository, branch: any, name: string, callback: any);

  /**
   * Add a task to the list. for syncing.
   *
   * @param {number} type                   Type of task to do.
   * @param {Array} args                    Arguments for the type.
   *
   * @returns {undefined} None
   */
  add( type: number, args: any[]): void;

  /**
   * Create a new remote branch.
   *
   * @param {string} remoteOwner              Owner of the remote branch.
   * @param {string} remoteBranch             Name of the remote branch.
   * @param {string} remoteObjectId           ID for the remote object.
   * @param {sring} referenece                (Optional) Reference for this pull request.
   * @param {string} start                    (Optional) Filter commits after this ID.
   * @param {string} end                      (Optional) Filter commits up to this ID.
   *
   * @returns {undefined} None
   */
  pull(remoteOwner: string, remoteBranch: string, remoteObjectId: string,
    reference?: string, start?: string, end?: string ): void;

  /**
   * Push commits from local branch to remote branch.
   *
   * @param {string} localBranch              Name of the local branch.
   * @param {string} remoteOwner              Owner of the remote branch.
   * @param {string} remoteBranch             Name of the remote branch.
   * @param {string} remoteObjectId           ID for the remote object.
   * @param {Array.commits} commits           Commits to be pushed.
   * @param {string} head                     Head to which we are pushing.
   *                                          Undefined if its a new object.
   *
   * @returns {undefined} None
   */
  push(localBranch: string, remoteOwner: string, remoteBranch: string, remoteObjectId: string, commits: any[], head?: string): void;

  /**
   * Search for objects on the remote branch.
   *
   * @param {string} remoteOwner              Owner of the remote branch.
   * @param {string} remoteBranch             Name of the remote branch.
   * @param {Object} query                    MongoDb like query.
   * @param {Object} refreshTime              Refresh time in seconds.
   * @param {Object} projections              (Optional) MongoDb like projections.
   * @param {Object} sort                     (Optional) Fields to sort on.
   * @param {Number} offset                   (Optional) Return documents from this
   *                                          position in the resultset.
   * @param {Number} limit                    (Optional) Return these many documents.
   * @param {string} start                    (Optional) Filter commits after this ID.
   * @param {string} end                      (Optional) Filter commits up to this ID.
   * @param {any[]} listeners                 (Optional) Listeners for this resultset.
   *
   * @returns {undefined} None
   */
  search(remoteOwner: string, remoteBranch: string, ref: string, query: any,
    refreshTime: any, projections?: any, sort?: any, offset?: number,
    limit?: number, start?: string, end?: string, listeners?: any[]): void;

  /**
   * Create a new remote branch.
   *
   * @param {string} branch                   Name of the branch.
   * @param {any} users                       Users to be given access to this branch.
   * @param {any} groups                      Groups to be given access to this branch.
   * @param {any} listeners                   Listeners for the branch.
   *
   * @returns {undefined} None
   */
  createBranch(branch: string, users?: any, groups?: any, listeners?: any): void;

  /**
   * Chunk for file
   *
   * @param {string} fileId                   ID of file being uploaded.
   * @param {number} chunkNumber              Chunk number.
   * @param {Buffer} chunk                    Chunk buffer.
   * @param {string} branch                   File system branch.
   * @param {string} remoteOwner              Owner of the remote branch.
   *
   * @returns {undefined} None
   */
  chunkForFile(fileId: string, chunkNumber: number, chunk: string,
    branch: string, remoteOwner:string ): void;

  /**
   * Merge chunks for file
   *
   * @param {string} fileId                   ID of file being uploaded.
   * @param {string} branch                   File system branch.
   * @param {string} remoteOwner              Owner of the remote branch.
   *
   * @returns {undefined} None
   */
  mergeChunksForFile(fileId: string, branch: string, remoteOwner:string ): void;

  // Sync Promise
  syncPromise: any;

  // Number of pending sync requests.
  public pendingSync: number;

  static CREATE_BRANCH: number;
  static PULL_ENTRY: number;
  static PUSH_ENTRY: number;
  static SEARCH_ENTRY: number;
  static POST_FILE_CHUNK: number;
  static MERGE_FILE_CHUNK: number;
  static NOTIFY_DATA: number;
}

export class JitFileManager {

  /**
   * Constructor
   *
   * @constructor
   *
   * @param {Repository} repo             Repository to keep track of pending
   *                                      requests.
   * @param {string} br                   Name of branch
   *
   * @class [JitFileManager Object]
   */
  constructor( repo: JitRepository, br: string );

  /**
   * Create new folder.
   *
   * @param {string} name                   Branch name
   * @param {string} parentId               Parent Folder Name
   *
   * @return {Promise} p                    Promise for new folder.
   */
  newFolder( name: string, parentId?: string ) : any;

   /**
   * Create a new file.
   *
   * @param {string} name                   Branch name
   * @param {string} fId                    Id for file.
   * @param {string} hash                   hasf for file
   * @param {date} lastModifiedTime         Last modified.
   * @param {number} size                   Size of file in bytes.
   * @param {string} ext                    Extension of file.
   * @param {string} parentId               (Optional) Id of the parent folder.
   * @param {Date} uploadTime               (Optional) Uploaded time.
   *
   * @return {Promise} p                    Promise for new file.
   */
  newFile( name: string, fId: string, hash: string, lastModifiedTime: Date, size: number,
      ext: string, parentId?: string, uploadTime?: Date ) : any;

  /**
   * Setup branch for file.
   *
   * @param {string} br name of branch
   *
   */
  setup( br: string );

  static TYPE_DIRECTORY: string;
  static TYPE_FILE: string;

  static CHUNK_SIZE: number;

  static UPLOAD_NOT_STARTED: number;
  static UPLOAD_PROCESSING: number;
  static UPLOAD_COMPLETED: number;
}

export class JitUserManagement {

  /**
   * Constructor
   *
   * @constructor
   *
   * @param {Repostitory} repo            The repo we keep our data.
   * @param {Object} branch               The branch we keep our data.
   *
   * @class [UserManagement Object]
   */
  constructor( repo: JitRepository, branch: any );

  /**
   * Add a user to the system. By default the user status is inactive.
   *
   * @param {string} name                Name.
   * @param {string} emailOrId           Email or ID.
   * @param {string} passwordOrSecret    Password or secret.
   * @param {string} grantType           Grant type allowed 'client_credentials' or 'password'.
   * @param {string} message             Commit message.
   *
   * @returns {Promise} result           Promise that resolves to true if added
   *                                     or false if user already exists.
   */
  addUser( name: string, emailOrId: string, passwordOrSecret: string,
    grantType: string, message: string ): any;

  /**
   * Change user status
   *
   * @param {string} emailOrId           Email or ID.
   * @param {string} status              Desired status.
   * @param {string} message             Commit message
   *
   * @returns {Boolean} result           True if updated. Fales implies user
   *                                     not found.
   */
  changeUserStatus( emailOrId: string, status: string, message: string ): any;

  /**
   * Change user password
   *
   * @param {string} emailOrId              Email or Id.
   * @param {string} passwordOrSecret       New password or secret
   * @param {string} message                Commit message
   *
   * @returns {Boolean} result              True if updated. Fales implies user
   *                                        not found.
   */
  changeUserPasswordOrSecret(emailOrId: string, passwordOrSecret: string,
    message: string ): any;


  /**
   * Generate password hash.
   *
   * @param {string} passwordOrSecret       Use this password to generate a new
   *                                        password hash. Salt will be updated
   *                                        too.
   *
   * @returns {Promise} result              New password hash.
   */
  generatePasswordOrSecret( password: string ): any;
}
